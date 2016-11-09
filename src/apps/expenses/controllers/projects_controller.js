import services from '../services'
import permit from '../../../utils/permit'

export default {

  index(req, res) {
    services.projects.fetchAll(req.query, success => {
      return res.status(200).json(success)
    }, error => {
      return res.status(404).json(error)
    })
  },

  show(req, res) {
    services.projects.fetch(req.params.id, success => {
      return res.status(200).json(success)
    }, error => {
      return res.status(404).json(error)
    })
  },

  create(req, res) {
    const params = permit(req.body, [])
    services.projects.create(params, success => {
      return res.status(201).json(success)
    }, error => {
      return res.status(422).json(error)
    })
  },

  update(req, res) {
    const params = permit(req.body, [])
    services.projects.update(req.params.id, params, success => {
      return res.status(201).json(success)
    }, error => {
      return res.status(422).json(error)
    })
  },

  destroy(req, res) {
    services.projects.destroy(req.params.id, success => {
      return res.status(201).json(success)
    }, error => {
      return res.status(422).json(error)
    })
  }

}
