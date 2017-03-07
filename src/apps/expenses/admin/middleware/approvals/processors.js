export default (type, model) => {

  const expenseProcessor = (action, is_approved) => {

    return req => {

      return model.where({ id: req.params.id }).fetch().then(resource => {

        return resource.save({ approved_by_id: req.user.get('id'), is_approved }, { patch: true })

      }).catch(err => {

        if(err.errors) throw({ code: 422, message: `Unable to ${action} ${type}`, errors: err.toJSON() })

        throw(err)

      })

    }

  }

  return {
    approve: expenseProcessor('approve', true),
    reject: expenseProcessor('reject', false)
  }

}
