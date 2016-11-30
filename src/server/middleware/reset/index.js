import { Router } from 'express'
import _ from 'lodash'
import jwt from 'server/services/jwt'
import { queue } from 'server/services/queue'
import User from 'platform/models/user'
import SecurityQuestion from 'platform/models/security_question'
import Error from 'server/utils/error'
import passport from 'server/services/passport'

export const create = (req, res, next) => {

  if(!req.body.email) {
    const error = new Error({ code: 422, message: 'Please enter an email.' })
    return next(error)
  }

  return User.where({ email: req.body.email }).fetch().then(user => {

    if(!user) {
      const error = new Error({ code: 401, message: 'Unable to find user.' })
      return next(error)
    }

    const one_day = 60 * 60 * 24
    const token = jwt.encode({ reset_user_id: user.id }, one_day)

    queue.createJob('send_reset_email', {
      from: 'notifier@cms.cce.cornell.edu',
      to: [req.body.email],
      subject: 'Your password reset',
      body: `Here is your password: <a href="${req.protocol}://${req.headers.host}/admin/reset/${token}">Reset Password</a>`
    }).save()

    return res.status(200).json({ token })

  })

}

export const middleware = (req, res, next) => {

  return passport('reset_user_id').authenticate('jwt', { session: false }, (err, user, info) => {

    if(err) {
      const error = new Error({ code: 401, message: 'Unable to find user.' })
      return next(error)
    }

    if(!user) {
      const error = new Error({ code: 401, message: info.message })
      return next(error)
    }

    const reset_at = user.get('reset_at')
    const is_expired = info.exp <= Math.floor(Date.now() / 1000)
    const was_used = reset_at && info.iat <= Math.floor(reset_at / 1000)

    if(is_expired || was_used) {
      const error = new Error({ code: 401, message: 'This reset token has expired. Please request a new one.' })
      return next(error)
    }

    req.user = user
    req.jwt = info

    next()
    return null

  })(req, res, next)

}

export const claim = (req, res, next) => {

  const index = _.random(1, 2)
  const question_id = req.user.get(`security_question_${index}_id`)
  const one_hour = 60 * 60
  const token = jwt.encode({ reset_user_id: req.user.get('id') }, one_hour)

  SecurityQuestion.where({ id: question_id }).fetch().then(question => {

    res.status(200).json({ token, question: { index, text: question.get('text') } })

  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    next(error)
  })

}

export const security = (req, res, next) => {

  if(req.user.get(`security_question_${req.body.security_question_index}_answer`) === req.body.answer) {
    res.status(200).json({ success: true })
  } else {
    const error = new Error({ code: 422, message: 'your answer did not match the one we have on file' })
    next(error)
  }

}

export const password = (req, res, next) => {

  if(!req.body.password || !req.body.confirm) {
    const error = new Error({ code: 422, message: 'please enter and confirm password' })
    return next(error)
  }

  if(req.body.password != req.body.confirm) {
    const error = new Error({ code: 422, message: 'passwords must match' })
    return next(error)
  }

  return req.user.save({ password: req.body.password, reset_at: new Date() }, { patch: true }).then(record => {

    const two_weeks = 60 * 60 * 24 * 7 * 2
    const token = jwt.encode({ user_id: req.user.id }, two_weeks)

    res.status(200).json({ token })

  }).catch(err => {
    const error = new Error({ code: 500, message: 'application error', errors: err.message })
    next(error)
  })

}

const reset = Router()
reset.post('/reset', create)
reset.use('/reset*', middleware)
reset.get('/reset/claim', claim)
reset.post('/reset/security', security)
reset.post('/reset/password', password)

export default reset
