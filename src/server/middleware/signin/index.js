import { Router } from 'express'
import Error from 'server/utils/error'
import passport from 'server/services/passport'
import jwt from 'server/services/jwt'

import Team from 'platform/models/team'
import User from 'platform/models/user'

import { queue } from 'server/services/queue'

export const teams = (req, res, next) => {

  return Team.where({ subdomain: req.query.subdomain }).fetch({ withRelated: ['logo','strategies'] }).then(team => {

    if(!team) {
      const error = new Error({ code: 404, message: 'Unable to find this domain' })
      return next(error)
    }

    const strategies = team.related('strategies').toJSON().map(strategy => {
      return strategy.name
    })

    return res.status(200).json({
      id: team.get('id'),
      title: team.get('title'),
      subdomain: team.get('subdomain'),
      logo: team.related('logo').get('url'),
      strategies
    })

  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })

}

export const email = (req, res, next) => {

  ['team_id','email'].map(field => {
    if(!req.query[field]) {
      const error = new Error({ code: 404, message: `${field} is required` })
      return next(error)
    }
  })

  return User.where({ team_id: req.query.team_id, email: req.query.email }).fetch({ withRelated: ['photo'] }).then(user => {

    if(!user) {
      const error = new Error({ code: 404, message: 'Unable to find this user' })
      return next(error)
    }

    return res.status(200).json({
      id: user.get('id'),
      full_name: user.get('full_name'),
      email: user.get('email'),
      photo: user.related('photo').get('url')
    })

  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })

}

export const password = (req, res, next) => {

  ['team_id','email','password'].map(field => {
    if(!req.body[field]) {
      const error = new Error({ code: 404, message: `${field} is required` })
      return next(error)
    }
  })

  return User.where({ team_id: req.body.team_id, email: req.body.email }).fetch().then(user => {

    if(!user) {
      const error = new Error({ code: 404, message: 'Unable to find this user' })
      return next(error)
    }

    if(!user.authenticate(req.body.password)) {
      const error = new Error({ code: 404, message: 'Invalid password' })
      return next(error)
    }

    const two_weeks = 60 * 60 * 24 * 7 * 2
    const token = jwt.encode({ user_id: user.id }, two_weeks)
    return res.status(200).json({ token })

  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })

}

export const forgot = (req, res, next) => {

  ['team_id','email'].map(field => {
    if(!req.body[field]) {
      const error = new Error({ code: 404, message: `${field} is required` })
      return next(error)
    }
  })

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

export const auth = (req, res, next) => {

  return passport('user_id').authenticate('jwt', { session: false }, (err, user, info) => {

    if(err) {
      const error = new Error({ code: 401, message: 'unable to load user' })
      return next(error)
    }

    if(!user) {
      const error = new Error({ code: 401, message: info.message })
      return next(error)
    }

    const two_weeks = 60 * 60 * 24 * 7 * 2
    const token = jwt.encode({ user_id: user.id }, two_weeks)
    return res.status(200).json({ token })

  })(req, res, next)

}

const router = Router()
router.get('/auth/teams', teams)
router.get('/auth/email', email)
router.post('/auth/password', password)
router.post('/auth/forgot', forgot)
router.post('/auth', auth)
export default router
