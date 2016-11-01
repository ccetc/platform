import models from '../models'
import serializers from '../serializers'
import permit from '../../utils/permit'

let controller = {}

controller.index = (req, res) => {
  models.user.fetchAll().then((users) => {
    res.json(users.map(user => serializers.user(user.attributes)))
  }).catch(function(err) {
    res.json({ message: 'Unable to fetch this records', errors: err.errors }).status(404)
  })
}

controller.show = (req, res) => {
  models.user.where({ id: req.params.id }).fetch().then((user) => {
    res.json(serializers.user(user.attributes))
  }).catch(function(err) {
    res.json({ message: 'Unable to fetch this record', errors: err.errors }).status(404)
  })
}

controller.create = (req, res) => {
  models.user.forge(permit(req.body, ['first_name', 'last_name', 'email']))
  .save()
  .then(user => {
    res.json(serializers.user(user.attributes))
  })
  .catch(function (err) {
    res.json({ message: 'There were problems with your data', errors: err.errors }).status(422)
  })
}

controller.update = (req, res) => {
  models.user.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(user => {
    user.save(permit(req.body, ['first_name', 'last_name', 'email']))
    .then(user => {
      res.json(serializers.user(user.attributes))
    })
    .catch(function (err) {
      res.json({ message: 'There were problems with your data', errors: err.errors }).status(422)
    })
  })
  .catch(function (err) {
    res.json({ message: 'Unable to fetch this record', errors: err.errors }).status(404)
  })
}

controller.destroy = (req, res) => {
  models.user.forge({ id: req.params.id })
  .fetch({ require: true })
  .then(user => {
    user.destroy()
    .then(user => {
      res.json(serializers.user(user.attributes))
    })
    .catch(err => {
      res.json({ message: 'Unable to delete this record', errors: err.errors }).status(422)
    })
  })
  .catch(err => {
    res.json({ message: 'Unable to fetch this record', errors: err.errors }).status(404)
  })
}


export default controller
