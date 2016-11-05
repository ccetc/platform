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
    if(req.query.email && req.query.password) {
      User.where({ email: req.query.email }).fetch({ require: true })
      .then(user => {
        if(user.authenticate(req.query.password)) {
          const encoded = jwt.encode({ timestamp, user_id: user.id }, secret)
          res.json({ token: encoded }).status(200)
        } else {
          res.json({ message: 'invalid password' }).status(422)
        }
      }).catch(err => {
        res.json({ message: 'cannot find user' }).status(422)
      })
    } else {
      res.json({ message: 'email and password required' }).status(422)
    }
  } else if(req.header('Authorization')) {
    const header = req.header('Authorization')
    const matches = header.match('Bearer (.*)')
    if(matches) {
      const data = decode(matches[1])
      if(data) {
        const two_weeks = 60 * 60 * 24 * 7 * 2
        if(data.timestamp > timestamp - two_weeks) {
          User.where({ id: data.user_id }).fetch({ require: true })
          .then(user => {
            if(!user.logged_out_at || (user.logged_out_at && data.timestamp > user.logged_out_at)) {
              if(req.path === '/refresh') {
                const encoded = jwt.encode({ timestamp, user_id: user.id }, secret)
                res.json({ token: encoded }).status(200)
              } else {
                next()
              }
            } else {
              res.json({ message: 'invalid user' }).status(401)
            }
          }).catch(err => {
            res.json({ message: 'cannot find user' }).status(401)
          })
        } else {
          res.json({ message: 'expired token' }).status(401)
        }
      } else {
        res.json({ message: 'invalid token' }).status(401)
      }
    } else {
      res.json({ message: 'malformed token' }).status(401)
    }
  } else {
    res.json({ message: 'nonexistant token' }).status(401)
  }
}
