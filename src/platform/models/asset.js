import model from 'platform/models/model'

export default model.extend({

  tableName: 'assets',

  virtuals: {
    url: function() {
      return (!this.isNew()) ? `https://s3.amazonaws.com/${process.env.AWS_BUCKET}/assets/${this.get('id')}/${this.get('file_name')}` : null
    }
  }

})
