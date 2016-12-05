import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'
import unique from 'server/utils/unique_validation'
import member from './member'

export default bookshelf.Model.extend({

  tableName: 'projects',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    title: ['required', unique('projects', 'title')],
    code: ['required', unique('projects', 'code')]
  },

  members: function() {
    return this.hasMany(member, 'project_id')
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
