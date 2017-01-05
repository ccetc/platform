import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'
import unique from 'server/utils/unique_validation'
import Author from 'platform/models/app_author'
import Category from 'platform/models/app_category'
import Role from 'platform/models/role'
import User from 'platform/models/user'

export default bookshelf.Model.extend({

  tableName: 'apps',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    title: ['required', unique('apps', 'title')]
  },

  author: function() {
    return this.belongsTo(Author, 'app_author_id')
  },

  category: function() {
    return this.belongsTo(Category, 'app_category_id')
  },

  users: function() {
    return this.belongsToMany(User, 'users_apps', 'app_id', 'user_id')
  },

  roles: function() {
    return this.belongsToMany(Role, 'roles_apps', 'role_id', 'app_id')
  },

  virtuals: {
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
