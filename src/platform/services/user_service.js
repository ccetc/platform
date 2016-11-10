import models from '../models'
import queries from '../queries'
import serializers from '../serializers'

export default {

  fetchAll(params, success, failure) {
    queries.users(models.user, params).fetchAll().then(users => {
      if(users.length) {
        success(users.map(user => serializers.user(user)))
      } else {
        failure({ message: 'Unable to fetch records' })
      }
    })
  },

  fetch(id, success, failure) {
    models.user.where({ id }).fetch().then(user => {
      if(user) {
        success(serializers.user(user))
      } else {
        failure({ message: 'Unable to fetch record' })
      }
    })
  },

  create(params, success, failure) {
    models.user.forge(params).save().then(user => {
      success(serializers.user(user))
    }).catch(err => {
      failure({ message: 'There were problems with your data', errors: err.toJSON() })
    })
  },

  update(id, params, success, failure) {
    models.user.where({ id }).fetch().then(user => {
      if(!user) {
        failure({ message: 'Unable to fetch record' })
      } else {
        return user.save(params).then(user => {
          success(serializers.user(user))
        }).catch(err => {
          failure({ message: 'There were problems with your data', errors: err.toJSON() })
        })
      }
    })
  },

  destroy(id, success, failure) {
    models.user.where({ id }).fetch().then(user => {
      if(!user) {
        failure({ message: 'Unable to fetch record' })
      } else {
        return user.destroy().then(user => {
          success({})
        }).catch(err => {
          failure({ message: 'Unable to delete record', errors: err.toJSON() })
        })
      }
    })
  }

}
