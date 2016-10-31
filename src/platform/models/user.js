import services from '../../services'
import checkit from  'checkit'

const unique = function(val) {
  return services.knex('users').where({ email: val }).whereNot({ id: this.target.id }).then(resp => {
    if (resp.length > 0) throw new Error('The email address is already in use')
  })
}

const user = services.bookshelf.Model.extend({

  tableName: 'users',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    first_name: 'required',
    last_name: 'required',
    email: ['required', 'email', unique]
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})

export default user
