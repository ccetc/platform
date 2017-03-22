import model from 'platform/models/model'
import Competency from './competency'
import Position from './position'

export default model.extend({

  tableName: 'competency_requirements',

  competency: function() {
    return this.belongsTo(Competency, 'position_id')
  },

  position: function() {
    return this.belongsTo(Position, 'position_id')
  }

})
