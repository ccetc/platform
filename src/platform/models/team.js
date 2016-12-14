import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'
import Asset from 'platform/models/asset'
import Strategy from 'platform/models/strategy'

export default bookshelf.Model.extend({

  tableName: 'teams',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    title: 'required'
  },

  logo: function() {
    return this.belongsTo(Asset, 'logo_id')
  },

  strategies: function() {
    return this.hasMany(Strategy, 'team_id')
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
