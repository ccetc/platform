import jwt from '../../utils/jwt'
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

    const token = jwt.encode({ user_id: user.id })
    return res.json({ token }).status(200)
  })
}

export default controller
