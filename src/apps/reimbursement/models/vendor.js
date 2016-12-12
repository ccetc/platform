import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'
import unique from 'server/utils/unique_validation'

export default bookshelf.Model.extend({

  tableName: 'reimbursement_vendors',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    name: ['required', unique('vendors', 'name')]
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
