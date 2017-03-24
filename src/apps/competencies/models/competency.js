import model from 'platform/models/model'
import Category from './category'
import Requirement from './requirement'
import Resource from './resource'

export default model.extend({

  tableName: 'competencies_competencies',

  category: function() {
    return this.belongsTo(Category, 'category_id')
  },

  requirements: function() {
    return this.hasMany(Requirement, 'competencies_id')
  },

  resources: function() {
    return this.belongsToMany(Resource)
  }

})
