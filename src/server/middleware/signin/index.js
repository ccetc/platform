import { Router } from 'express'
import Error from 'server/utils/error'
import passport from 'server/services/passport'
import jwt from 'server/services/jwt'

export const auth = (req, res, next) => {

  const strategy = (req.header('Authorization')) ? 'jwt' : 'local'
  const options = (req.header('Authorization')) ? { session: false } : { badRequestMessage: 'email and password required' }

  passport('user_id').authenticate(strategy, options, (err, user, info) => {

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

const signin = Router()
signin.post('/auth', auth)

export default signin
