import models from '../models'
import queries from '../queries'
import serializers from '../serializers'

export default {

  fetchAll(params, success, failure) {
    queries.expense(models.expense, params).fetchAll().then(expenses => {
      if(expenses.length) {
        success(expenses.map(expense => serializers.expense(expense)))
      } else {
        failure({ message: 'Unable to fetch records' })
      }
    })
  },

  fetch(id, success, failure) {
    models.expense.where({ id }).fetch().then(expense => {
      if(expense) {
        success(serializers.expense(expense))
      } else {
        failure({ message: 'Unable to fetch record' })
      }
    })
  },

  create(params, success, failure) {
    models.expense.forge(params).save().then(expense => {
      success(serializers.expense(expense))
    }).catch(err => {
      failure({ message: 'There were problems with your data', errors: err.toJSON() })
    })
  },

  update(id, params, success, failure) {
    models.expense.where({ id }).fetch().then(expense => {
      if(!expense) {
        failure({ message: 'Unable to fetch record' })
      } else {
        return expense.save(params).then(expense => {
          success(serializers.expense(expense))
        }).catch(err => {
          failure({ message: 'There were problems with your data', errors: err.toJSON() })
        })
      }
    })
  },

  destroy(id, success, failure) {
    models.expense.where({ id }).fetch().then(expense => {
      if(!expense) {
        failure({ message: 'Unable to fetch record' })
      } else {
        return expense.destroy().then(expense => {
          success({})
        }).catch(err => {
          failure({ message: 'Unable to delete record', errors: err.toJSON() })
        })
      }
    })
  }

}
