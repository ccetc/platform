import models from '../models'
import serializers from '../serializers'
import permit from '../../utils/permit'

let controller = {}

controller.index = (req, res) => {
  throw new Error('foo')

  models.user.fetchAll().then(users => {
    if(users.length) {
      return res.json(users.map(user => serializers.user(user))).status(200)
    } else {
      return res.json({ message: 'Unable to fetch records' }).status(404)
    }
  })
}

controller.show = (req, res) => {
  models.user.where({ id: req.params.id }).fetch().then(user => {
    if(!user) {
      return res.json({ message: 'Unable to fetch record' }).status(404)
    }
    return res.json(serializers.user(user)).status(200)
  })
}

controller.create = (req, res) => {
  models.user.forge(permit(req.body, ['first_name', 'last_name', 'email'])).save().then(user => {
    return res.json(serializers.user(user)).status(201)
  })
  .catch(err => {
    return res.json({ message: 'There were problems with your data', errors: err.toJSON() }).status(422)
  })
}

controller.update = (req, res) => {
  models.user.where({ id: req.params.id }).fetch().then(user => {
    if(!user) {
      return res.json({ message: 'Unable to fetch record' }).status(404)
    }
    return user.save(permit(req.body, ['first_name', 'last_name', 'email'])).then(user => {
      return res.json(serializers.user(user)).status(201)
    }).catch(err => {
      return res.json({ message: 'There were problems with your data', errors: err.toJSON() }).status(422)
    })
  })
}

controller.destroy = (req, res) => {
  models.user.where({ id: req.params.id }).fetch().then(user => {
    if(!user) {
      return res.json({ message: 'Unable to fetch record' }).status(404)
    }
    return user.destroy().then(user => {
      return res.json({}).status(201)
    })
    .catch(err => {
      return res.json({ message: 'Unable to delete record', errors: err.toJSON() }).status(422)
    })
  })
}

export default controller
