import models from '../models'
import queries from '../queries'
import serializers from '../serializers'

export default {

  fetchAll(params, success, failure) {
    queries.advance(models.advance, params).fetchAll().then(advances => {
      if(advances.length) {
        success(advances.map(advance => serializers.advance(advance)))
      } else {
        failure({ message: 'Unable to fetch records' })
      }
    })
  },

  fetch(id, success, failure) {
    models.advance.where({ id }).fetch().then(advance => {
      if(advance) {
        success(serializers.advance(advance))
      } else {
        failure({ message: 'Unable to fetch record' })
      }
    })
  },

  create(params, success, failure) {
    models.advance.forge(params).save().then(advance => {
      success(serializers.advance(advance))
    }).catch(err => {
      failure({ message: 'There were problems with your data', errors: err.toJSON() })
    })
  },

  update(id, params, success, failure) {
    models.advance.where({ id }).fetch().then(advance => {
      if(!advance) {
        failure({ message: 'Unable to fetch record' })
      } else {
        return advance.save(params).then(advance => {
          success(serializers.advance(advance))
        }).catch(err => {
          failure({ message: 'There were problems with your data', errors: err.toJSON() })
        })
      }
    })
  },

  destroy(id, success, failure) {
    models.advance.where({ id }).fetch().then(advance => {
      if(!advance) {
        failure({ message: 'Unable to fetch record' })
      } else {
        return advance.destroy().then(advance => {
          success({})
        }).catch(err => {
          failure({ message: 'Unable to delete record', errors: err.toJSON() })
        })
      }
    })
  }

}
