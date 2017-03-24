import model from 'platform/models/model'
import Competency from './competency'

export default model.extend({

  tableName: 'competencies_categories',

  competencies: function() {
    return this.hasMany(Competency, 'category_id')
  }

})
