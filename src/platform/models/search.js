import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'

export default bookshelf.Model.extend({

  tableName: 'searches',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
