import model from 'platform/models/model'
import Commitment from './commitment'
import Skill from './skill'

export default model.extend({

  tableName: 'competency_resources',

  commitments: function() {
    return this.hasMany(Commitment, 'resource_id')
  },

  skill: function() {
    return this.belongsTo(Skill, 'skill_id')
  }

})
