import model from 'platform/models/model'
import Competency from './competency'
import Resource from './resource'

export default model.extend({

  tableName: 'competency_skills',

  competency: function() {
    return this.belongsTo(Competency, 'competency_id')
  },

  resources: function() {
    return this.hasMany(Resource, 'skill_id')
  }

})
