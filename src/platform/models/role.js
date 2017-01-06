import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'
import App from 'platform/models/app'
import Right from 'platform/models/right'
import User from 'platform/models/user'

export default bookshelf.Model.extend({

  tableName: 'roles',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    text: 'required'
  },

  apps: function() {
    return this.belongsToMany(App, 'roles_apps', 'role_id', 'app_id')
  },

  rights: function() {
    return this.belongsToMany(Right, 'roles_rights', 'role_id', 'right_id')
  },

  users: function() {
    return this.belongsToMany(User, 'users_roles', 'role_id', 'user_id')
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
