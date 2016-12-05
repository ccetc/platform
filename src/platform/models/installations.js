import checkit from  'checkit'
import instance from 'platform/models/instance'
import app from 'platform/models/app'
import bookshelf from 'server/services/bookshelf'

export default bookshelf.Model.extend({

  tableName: 'installations',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    app_id: 'required',
    intance_id: 'required'
  },

  instance: function() {
    return this.belongsTo(instance, 'instance_id')
  },

  app: function() {
    return this.belongsTo(app, 'app_id')
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
