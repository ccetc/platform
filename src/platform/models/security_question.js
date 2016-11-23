import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'

export default bookshelf.Model.extend({

  tableName: 'security_questions',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    text: ['required']
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
