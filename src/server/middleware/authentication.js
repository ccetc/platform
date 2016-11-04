import jwt from 'jwt-simple'
import config from '../../../config/platform'

const secret = config[process.env.NODE_ENV].secret

export default (req, res, next) => {
  const timestamp = Math.round(new Date() / 1000)
  if(req.path == '/authenticate') {
    if(req.query.email && req.query.password) {
      if(req.query.email == 'gmk8@cornell.edu') {
        if(req.query.password == 'test') {
          const encoded = jwt.encode({ timestamp, user: 1 }, secret)
          res.json({ token: encoded }).status(200)
        } else {
          res.json({ message: 'invalid password' }).status(422)
        }
      } else {
        res.json({ message: 'cannot find user' }).status(422)
      }
    } else {
      res.json({ message: 'email and password required' }).status(422)
    }
  } else if(req.header('Authorization')) {
    const header = req.header('Authorization')
    const matches = header.match('Bearer (.*)')
    if(matches) {
      const token = matches[1]
      try {
        const data = jwt.decode(token, secret)
        if(timestamp < data.timestamp + 60 * 60 * 24 * 7 * 2) {
          if(data.user === 1) {
            const user = { logged_out_at: Math.round(new Date() / 1000) - 30 }
            if(!user.logged_out_at || (user.logged_out_at && data.timestamp > user.logged_out_at)) {
              if(req.path === '/refresh') {
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
      res.json({ message: 'malformed token' }).status(401)
    }
  } else {
    res.json({ message: 'nonexistant token' }).status(401)
  }
}
