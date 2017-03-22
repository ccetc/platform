export default (type, model) => {

  return (req, resolve, reject) => {

    return model.where({ id: req.params.id }).fetch({ withRelated: ['project'] }).then(resource => {

      return resource.save({ is_submitted: true }, { patch: true }).then(result => {
        resolve(result)
      })

    }).catch(err => {

      if(err.errors) return reject({ code: 422, message: `Unable to submit ${type}`, errors: err.toJSON() })

      reject({ code: 500, message: err.message })

    })

  }

}
