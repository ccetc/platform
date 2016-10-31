import checkit from  'checkit'
import services from '../../services'
import unique from '../../utils/validations/unique'

const user = services.bookshelf.Model.extend({

  tableName: 'users',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    first_name: 'required',
    last_name: 'required',
    email: ['required', 'email', unique('users', 'email')]
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})

export default user
