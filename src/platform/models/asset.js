import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'
import unique from 'server/utils/unique_validation'

export default bookshelf.Model.extend({

  tableName: 'assets',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    fingerprint: [unique('assets', 'fingerprint')]
  },

  virtuals: {
    url: function() {
      return `/images/${this.get('file_name')}`
    }
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
