import model from 'platform/models/model'
import Category from './category'
import Requirement from './requirement'
import Skill from './skill'

export default model.extend({

  tableName: 'competency_competencies',

  category: function() {
    return this.belongsTo(Category, 'category_id')
  },

  requirements: function() {
    return this.hasMany(Requirement, 'competency_id')
  },

  skills: function() {
    return this.hasMany(Skill, 'competency_id')
  }

})
