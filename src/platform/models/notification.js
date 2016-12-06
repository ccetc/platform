import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'

import Story from 'platform/models/story'
import User from 'platform/models/user'

export default bookshelf.Model.extend({

  tableName: 'notifications',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    user_id: ['required']
  },

  story: function() {
    return this.belongsTo(Story)
  },

  user: function() {
    return this.belongsTo(User)
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
