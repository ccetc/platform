import checkit from  'checkit'
import bcrypt from 'bcrypt-nodejs'
import bookshelf from 'server/services/bookshelf'
import unique from 'server/utils/unique_validation'
import App from 'platform/models/app'
import Asset from 'platform/models/asset'
import Right from 'platform/models/right'
import SecurityQuestion from 'platform/models/security_question'

export default bookshelf.Model.extend({

  tableName: 'users',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    first_name: 'required',
    last_name: 'required',
    email: ['required', 'email', unique('users', 'email')]
  },

  apps: function() {
    return this.belongsToMany(App, 'users_apps', 'user_id', 'app_id')
  },

  photo: function() {
    return this.belongsTo(Asset, 'photo_id')
  },

  security_question_1: function() {
    return this.belongsTo(SecurityQuestion, 'security_question_1_id')
  },

  security_question_2: function() {
    return this.belongsTo(SecurityQuestion, 'security_question_2_id')
  },

  rights: function() {
    return this.belongsToMany(Right, 'users_rights', 'user_id', 'right_id')
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
