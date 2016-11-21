import checkit from  'checkit'
import bookshelf from 'services/bookshelf'
import unique from 'utils/unique_validation'

export default bookshelf.Model.extend({

  tableName: 'assets',

  hasTimestamps: ['created_at', 'updated_at'],

  rules: {
    fingerprint: [unique('assets', 'fingerprint')]
  },

  virtuals: {
    url: function() {
      return 'https://s3.amazonaws.com/assets/'+this.get('id')+'/'+this.get('file_name')
    }
  },

  initialize: function(attrs, opts) {
    this.on('saving', this.validateSave)
  },

  validateSave: function() {
    return new checkit(this.rules).run(this.attributes)
  }

})
