import checkit from  'checkit'
import team from 'platform/models/team'
import app from 'platform/models/app'
import bookshelf from 'server/services/bookshelf'

export default bookshelf.Model.extend({

  tableName: 'installations',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    app_id: 'required',
    intance_id: 'required'
  },

  team: function() {
    return this.belongsTo(team, 'team_id')
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
