import jwt from 'jwt-simple'
import config from '../../../config/platform'
import models from '../../platform/models'

let controller = {}

controller.create = (req, res) => {

  if(!req.body.email || !req.body.password) {
    return res.json({ message: 'email and password required' }).status(422)
  }

  models.user.where({ email: req.body.email }).fetch().then(user => {

    if(!user) {
      return res.json({ message: 'cannot find user' }).status(422)
    }

    if(!user.authenticate(req.body.password)) {
      return res.json({ message: 'invalid password' }).status(422)
    }

    const secret = config[process.env.NODE_ENV].secret
    const timestamp = Math.round(new Date() / 1000)
    const encoded = jwt.encode({ timestamp, user_id: user.id }, secret)
    return res.json({ token: encoded }).status(200)
  })
}

export default controller
