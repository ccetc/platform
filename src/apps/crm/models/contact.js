import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'
import unique from 'server/utils/unique_validation'

export default bookshelf.Model.extend({

  tableName: 'contacts',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    first_name: 'required',
    last_name: 'required',
    email: ['required', 'email', unique('users', 'email')]
  },

  virtuals: {
    full_name: function() {
      return this.get('first_name') + ' ' + this.get('last_name')
    }
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
