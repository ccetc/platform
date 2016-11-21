import services from 'platform/admin/api/services'
import permit from 'utils/permit'

export default {

  index(req, res) {
    services.user.fetchAll(req.query, success => {
      return res.status(200).json(success)
    }, error => {
      return res.status(404).json(error)
    })
  },

  show(req, res) {
    services.user.fetch(req.params.id, success => {
      return res.status(200).json(success)
    }, error => {
      return res.status(404).json(error)
    })
  },

  create(req, res) {
    const params = permit(req.body, ['first_name', 'last_name', 'email'])
    services.user.create(params, success => {
      return res.status(201).json(success)
    }, error => {
      return res.status(422).json(error)
    })
  },

  update(req, res) {
    const params = permit(req.body, ['first_name', 'last_name', 'email'])
    services.user.update(req.params.id, params, success => {
      return res.status(201).json(success)
    }, error => {
      return res.status(422).json(error)
    })
  },

  destroy(req, res) {
    services.user.destroy(req.params.id, success => {
      return res.status(201).json(success)
    }, error => {
      return res.status(422).json(error)
    })
  }

}
