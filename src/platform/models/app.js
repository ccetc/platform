import checkit from  'checkit'
import bookshelf from 'services/bookshelf'
import unique from 'utils/unique_validation'

export default bookshelf.Model.extend({

  tableName: 'apps',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    title: ['required', unique('apps', 'title')]
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
