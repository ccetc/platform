import jwt from 'jwt-simple'
import config from '../config/platform'

const secret = config[process.env.NODE_ENV].secret

export default (req, res, next) => {
  if(req.query.token) {
    try {
      const data = jwt.decode(req.query.token, secret)
      const timestamp = Math.round(new Date() / 1000)
      if(timestamp < data.timestamp + 60 * 60 * 24 * 7 * 2) {
        if(data.user === 1) {
          const user = { logged_out_at: Math.round(new Date() / 1000) - 30 }
          if(data.timestamp > user.logged_out_at) {
            if(req.path === '/api/refresh') {
              const encoded = jwt.encode({ timestamp, user: 1 }, secret)
              res.json({ token: encoded }).status(200)
            } else {
              next()
            }
          } else {
            res.json({ message: 'expired token' }).status(401)
          }
        } else {
          res.json({ message: 'invalid user' }).status(401)
        }
      } else {
        res.json({ message: 'expired token' }).status(401)
      }
    } catch (e) {
      res.json({ message: 'invalid token' }).status(401)
    }
  } else {
    res.json({ message: 'nonexistant token' }).status(401)
  }
}
