import checkit from  'checkit'
import bookshelf from 'services/bookshelf'
import unique from 'utils/unique_validation'

export default bookshelf.Model.extend({

  tableName: 'apps',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    name: ['required', unique('apps', 'name')]
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
