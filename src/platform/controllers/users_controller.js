import models from '../models'
import serializers from '../serializers'
import permit from '../../utils/permit'

let controller = {}

controller.index = (req, res) => {
  models.user.fetchAll()
  .then(users => {
    if(users.length) {
      res.json(users.map(user => serializers.user(user.attributes))).status(200)
    } else {
      res.json({ message: 'Unable to fetch records' }).status(404)
    }
  }).catch(err => {
    res.json({ message: 'Application error' }).status(500)
  })
}

controller.show = (req, res) => {
  models.user.forge({ id: req.params.id }).fetch({ require: true })
  .then(user => {
    res.json(serializers.user(user.attributes)).status(200)
  }).catch(err => {
    res.json({ message: 'Unable to fetch record' }).status(404)
  })
}

controller.create = (req, res) => {
  models.user.forge(permit(req.body, ['first_name', 'last_name', 'email']))
  .save()
  .then(user => {
    res.json(serializers.user(user.attributes)).status(201)
  })
  .catch(err => {
    res.json({ message: 'There were problems with your data', errors: err.toJSON() }).status(422)
  })
}

controller.update = (req, res) => {
  models.user.forge({ id: req.params.id }).fetch({ require: true })
  .then(user => {
    return user.save(permit(req.body, ['first_name', 'last_name', 'email']))
    .then(user => {
      res.json(serializers.user(user.attributes)).status(201)
    }).catch(err => {
      res.json({ message: 'There were problems with your data', errors: err.toJSON() }).status(422)
    })
  })
  .catch(err => {
    res.json({ message: 'Unable to fetch record' }).status(404)
  })
}

controller.destroy = (req, res) => {
  models.user.forge({ id: req.params.id }).fetch({ require: true })
  .then(user => {
    return user.destroy()
    .then(user => {
      res.json({}).status(201)
    })
    .catch(err => {
      res.json({ message: 'Unable to delete record', errors: err.toJSON() }).status(422)
    })
  })
  .catch(err => {
    res.json({ message: 'Unable to fetch record' }).status(404)
  })
}

export default controller
