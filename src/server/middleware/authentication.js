import jwt from 'jwt-simple'
import config from '../../../config/platform'
import User from '../../platform/models/user'

const secret = config[process.env.NODE_ENV].secret

const decode = (token) => {
  try {
    return jwt.decode(token, secret)
  } catch (e) {
    return null
  }
}

export default (req, res, next) => {
  const timestamp = Math.round(new Date() / 1000)

  if(req.path == '/authenticate') {

    if(!req.query.email || !req.query.password) {
      return res.json({ message: 'email and password required' }).status(422)
    }

    User.where({ email: req.query.email }).fetch({ require: true }).then(user => {

      if(!user.authenticate(req.query.password)) {
        return res.json({ message: 'invalid password' }).status(422)
      }

      const encoded = jwt.encode({ timestamp, user_id: user.id }, secret)
      return res.json({ token: encoded }).status(200)


    }).catch(err => {
      return res.json({ message: 'cannot find user' }).status(422)
    })

  } else if(req.header('Authorization')) {

    const header = req.header('Authorization')
    const matches = header.match('Bearer (.*)')

    if(!matches) {
      return res.json({ message: 'malformed token' }).status(401)
    }

    const data = decode(matches[1])
    if(!data) {
      return res.json({ message: 'invalid token' }).status(401)
    }

    const two_weeks = 60 * 60 * 24 * 7 * 2
    if(data.timestamp <= timestamp - two_weeks) {
      return res.json({ message: 'expired token' }).status(401)
    }

    User.where({ id: data.user_id }).fetch({ require: true }).then(user => {

      const logged_out_at = user.get('logged_out_at')
      if(logged_out_at && data.timestamp <= Math.round(logged_out_at / 1000)) {
        return res.json({ message: 'expired token' }).status(401)
      }

      if(req.path === '/refresh') {
        const encoded = jwt.encode({ timestamp, user_id: user.id }, secret)
        return res.json({ token: encoded }).status(200)
      }

      next()

      return null

    }).catch(err => {
      return res.json({ message: 'cannot find user' }).status(401)
    })

  } else {
    return res.json({ message: 'nonexistant token' }).status(401)
  }

}
