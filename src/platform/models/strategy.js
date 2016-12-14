import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'
import Team from 'platform/models/team'

export default bookshelf.Model.extend({

  tableName: 'strategies',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
  },

  team: function() {
    return this.belongsTo(Team, 'team_id')
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
