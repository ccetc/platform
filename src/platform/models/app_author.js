import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'
import unique from 'server/utils/unique_validation'
import App from 'platform/models/app'

export default bookshelf.Model.extend({

  tableName: 'app_authors',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    title: ['required', unique('apps', 'name')]
  },

  apps: function() {
    return this.hasMany(App, 'app_author_id')
  },

  virtuals: {
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
