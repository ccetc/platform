import checkit from  'checkit'
import bookshelf from 'server/services/bookshelf'
import asset from 'platform/models/asset'

export default bookshelf.Model.extend({

  tableName: 'teams',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    title: 'required'
  },

  logo: function() {
    return this.belongsTo(asset, 'logo_id')
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
