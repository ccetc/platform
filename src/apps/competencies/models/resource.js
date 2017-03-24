import model from 'platform/models/model'
import Commitment from './commitment'
import Competency from './competency'

export default model.extend({

  tableName: 'competencies_resources',

  commitments: function() {
    return this.hasMany(Commitment, 'resource_id')
  },

  competency: function() {
    return this.belongsToMany(Competency)
  }

})
