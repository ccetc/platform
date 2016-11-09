import jwt from '../../utils/jwt'
import models from '../../platform/models'

let controller = {}

controller.create = (req, res) => {

  if(!req.body.email || !req.body.password) {
    return res.status(422).json({ message: 'email and password required' })
  }

  models.user.where({ email: req.body.email }).fetch().then(user => {

    if(!user) {
      return res.status(422).json({ message: 'cannot find user' })
    }

    if(!user.authenticate(req.body.password)) {
      return res.status(422).json({ message: 'invalid password' })
    }

    const token = jwt.encode({ user_id: user.id })
    return res.status(200).json({ token })
  })
}

export default controller
