import model from 'platform/models/model'
import User from  'platform/models/user'
import Commitment from './commitment'

export default model.extend({

  tableName: 'competencies_plans',

  commitments: function() {
    return this.hasMany(Commitment, 'plan_id')
  },

  supervisor: function() {
    return this.belongsTo(User, 'supervisor_id')
  },

  user: function() {
    return this.belongsTo(User, 'user_id')
  }

})
