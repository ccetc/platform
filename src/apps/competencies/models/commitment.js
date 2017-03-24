import model from 'platform/models/model'
import Plan from './plan'
import Resource from './resource'

export default model.extend({

  tableName: 'competencies_commitments',

  plan: function() {
    return this.belongsTo(Plan, 'plan_id')
  },

  resource: function() {
    return this.belongsTo(Resource, 'resource_id')
  }

})
