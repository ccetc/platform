import { Router } from 'express'
import jwt from 'services/jwt'
import queue from 'services/queue'
import User from 'platform/models/user'
import Error from 'utils/error'
import passport from 'services/passport'

export const create = (req, res, next) => {

  if(!req.body.email) {
    const error = new Error({ code: 422, message: 'email required' })
    next(error)
  }

  User.where({ email: req.body.email }).fetch().then(user => {

    if(!user) {
      const error = new Error({ code: 401, message: 'unable to load user' })
      return next(error)
    }

    const one_day = 60 * 60 * 24
    const token = jwt.encode({ reset_user_id: user.id }, one_day)

    // queue.createJob('send_reset_email', {
    //   from: 'notifier@cms.cce.cornell.edu',
    //   to: [req.body.email],
    //   subject: 'Your password reset',
    //   body: `Here is your password: <a href="/admin/reset/${token}">Reset Password</a>`
    // }).save()

    return res.status(200).json({ token })

  })

}

export const middleware = (req, res, next) => {

  passport('reset_user_id').authenticate('jwt', { session: false }, (err, user, info) => {

    if(err) {
      const error = new Error({ code: 401, message: 'unable to load user' })
      next(error)
    }

    if(!user) {
      const error = new Error({ code: 401, message: info.message })
      next(error)
    }

    req.user = user
    next()
    return null

  })(req, res, next)

}

export const claim = (req, res, next) => {
  res.json({ success: req.user })
}

export const security = (req, res, next) => {
  res.json({ success: req.user })
}

export const password = (req, res, next) => {
  res.json({ success: req.user })
}

const reset = Router()
reset.post('/reset', create)
reset.use('/reset*', middleware)
reset.get('/reset/:token', claim)
reset.get('/reset/security', security)
reset.get('/reset/password', password)

export default reset
