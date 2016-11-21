import models from '../models'
import queries from '../queries'
import serializers from '../serializers'

export default {

  fetchAll(params, success, failure) {
    queries.expense_type(models.expense_type, params).fetchAll().then(expense_types => {
      if(expense_types.length) {
        success(expense_types.map(expense_type => serializers.expense_type(expense_type)))
      } else {
        failure({ message: 'Unable to fetch records' })
      }
    })
  },

  fetch(id, success, failure) {
    models.expense_type.where({ id }).fetch().then(expense_type => {
      if(expense_type) {
        success(serializers.expense_type(expense_type))
      } else {
        failure({ message: 'Unable to fetch record' })
      }
    })
  },

  create(params, success, failure) {
    models.expense_type.forge(params).save().then(expense_type => {
      success(serializers.expense_type(expense_type))
    }).catch(err => {
      failure({ message: 'There were problems with your data', errors: err.toJSON() })
    })
  },

  update(id, params, success, failure) {
    models.expense_type.where({ id }).fetch().then(expense_type => {
      if(!expense_type) {
        failure({ message: 'Unable to fetch record' })
      } else {
        return expense_type.save(params).then(expense_type => {
          success(serializers.expense_type(expense_type))
        }).catch(err => {
          failure({ message: 'There were problems with your data', errors: err.toJSON() })
        })
      }
    })
  },

  destroy(id, success, failure) {
    models.expense_type.where({ id }).fetch().then(expense_type => {
      if(!expense_type) {
        failure({ message: 'Unable to fetch record' })
      } else {
        return expense_type.destroy().then(expense_type => {
          success({})
        }).catch(err => {
          failure({ message: 'Unable to delete record', errors: err.toJSON() })
        })
      }
    })
  }

}
