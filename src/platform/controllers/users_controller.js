import models from '../models'
import serializers from '../serializers'
import permit from '../../utils/permit'

let controller = {}

controller.index = (req, res) => {
  models.user.fetchAll().then(users => {
    if(users.length) {
      return res.status(200).json(users.map(user => serializers.user(user)))
    } else {
      return res.status(404).json({ message: 'Unable to fetch records' })
    }
  })
}

controller.show = (req, res) => {
  models.user.where({ id: req.params.id }).fetch().then(user => {
    if(!user) {
      return res.status(404).json({ message: 'Unable to fetch record' })
    }
    return res.status(200).json(serializers.user(user))
  })
}

controller.create = (req, res) => {
  models.user.forge(permit(req.body, ['first_name', 'last_name', 'email'])).save().then(user => {
    return res.status(201).json(serializers.user(user))
  })
  .catch(err => {
    return res.status(422).json({ message: 'There were problems with your data', errors: err.toJSON() })
  })
}

controller.update = (req, res) => {
  models.user.where({ id: req.params.id }).fetch().then(user => {
    if(!user) {
      return res.status(404).json({ message: 'Unable to fetch record' })
    }
    return user.save(permit(req.body, ['first_name', 'last_name', 'email'])).then(user => {
      return res.status(201).json(serializers.user(user))
    }).catch(err => {
      return res.status(422).json({ message: 'There were problems with your data', errors: err.toJSON() })
    })
  })
}

controller.destroy = (req, res) => {
  models.user.where({ id: req.params.id }).fetch().then(user => {
    if(!user) {
      return res.status(404).json({ message: 'Unable to fetch record' })
    }
    return user.destroy().then(user => {
      return res.status(201).json({})
    })
    .catch(err => {
      return res.status(422).json({ message: 'Unable to delete record', errors: err.toJSON() })
    })
  })
}

export default controller
