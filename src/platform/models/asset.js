import model from 'platform/models/model'

export default model.extend({

  tableName: 'assets',

  virtuals: {
    path: function() {
      return (!this.isNew()) ? `/assets/${this.get('id')}/${this.get('file_name')}` : null
    },
    url: function() {
      return (!this.isNew()) ? `https://s3.amazonaws.com/${process.env.AWS_BUCKET}${this.get('path')}` : null
    }
  }

})
