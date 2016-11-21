import services from '../services'
import permit from 'utils/permit'

export default {

  index(req, res) {
    services.advances.fetchAll(req.query, success => {
      return res.status(200).json(success)
    }, error => {
      return res.status(404).json(error)
    })
  },

  show(req, res) {
    services.advances.fetch(req.params.id, success => {
      return res.status(200).json(success)
    }, error => {
      return res.status(404).json(error)
    })
  },

  create(req, res) {
    const params = permit(req.body, [])
    services.advances.create(params, success => {
      return res.status(201).json(success)
    }, error => {
      return res.status(422).json(error)
    })
  },

  update(req, res) {
    const params = permit(req.body, [])
    services.advances.update(req.params.id, params, success => {
      return res.status(201).json(success)
    }, error => {
      return res.status(422).json(error)
    })
  },

  destroy(req, res) {
    services.advances.destroy(req.params.id, success => {
      return res.status(201).json(success)
    }, error => {
      return res.status(422).json(error)
    })
  }

}
