import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'
import App from 'platform/models/app'
import User from 'platform/models/user'

export default bookshelf.Model.extend({

  tableName: 'rights',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    text: 'required',
    app_id: 'required'
  },

  app: function() {
    return this.belongsTo(App, 'app_id')
  },

  users: function() {
    return this.belongsToMany(User, 'users_rights', 'right_id', 'user_id')
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
