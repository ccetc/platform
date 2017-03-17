import moment from 'moment'

export default (type, model, action, is_approved) => {

  return (req, resolve, reject) => {

    return model.where({ id: req.params.id }).fetch({ withRelated: ['project'] }).then(resource => {

      const data = {
        approved_by_id: req.user.get('id'),
        approved_at: moment(),
        reason_rejected: req.body.reason_rejected,
        is_approved,
        is_submitted: is_approved
      }

      return resource.save(data, { patch: true }).then(result => {
        resolve(result)
      })

    }).catch(err => {

      if(err.errors) return reject({ code: 422, message: `Unable to ${action} ${type}`, errors: err.toJSON() })

      reject({ code: 500, message: err.message })

    })

  }

}
