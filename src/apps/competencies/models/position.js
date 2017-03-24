import model from 'platform/models/model'
import Classification from './classification'
import Program from './program'
import Requirement from './requirement'

export default model.extend({

  tableName: 'competencies_positions',

  classification: function() {
    return this.belongsTo(Classification, 'classification_id')
  },

  program: function() {
    return this.belongsTo(Program, 'program_id')
  },

  requirements: function() {
    return this.hasMany(Requirement, 'position_id')
  }

})
