import checkit from  'checkit'
import bcrypt from 'bcrypt'
import asset from './asset'
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

  photo: function() {
    return this.belongsTo(asset, 'photo_id')
  },

  virtuals: {
    full_name: function() {
      return this.get('first_name') + ' ' + this.get('last_name')
    },
    password: {
      get: function() {},
      set: function(value) {
        const password_salt = bcrypt.genSaltSync(10)
        this.set('password_salt', password_salt)
        this.set('password_hash', bcrypt.hashSync(value, password_salt))
      }
    }
  },

  authenticate: function(password) {
    return this.get('password_hash') === bcrypt.hashSync(password, this.get('password_salt'))
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})

export default user
