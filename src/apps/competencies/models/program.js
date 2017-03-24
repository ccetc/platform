import model from 'platform/models/model'
import Position from './position'

export default model.extend({

  tableName: 'competencies_programs',

  positions: function() {
    return this.hasMany(Position, 'position_id')
  }

})
