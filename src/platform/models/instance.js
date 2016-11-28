import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'

export default bookshelf.Model.extend({

  tableName: 'instances',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    title: 'required'
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
