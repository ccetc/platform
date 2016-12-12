import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'
import unique from 'server/utils/unique_validation'

export default bookshelf.Model.extend({

  tableName: 'reimbursement_expense_types',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    title: ['required', unique('users', 'email')],
    code: ['required', unique('users', 'email')]
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
