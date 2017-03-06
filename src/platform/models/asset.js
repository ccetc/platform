import model from 'platform/models/model'

export default model.extend({

  tableName: 'assets',

  virtuals: {
    url: function() {
      return (!this.isNew()) ? `https://s3.amazonaws.com/${process.env.AWS_BUCKET}/assets/${this.get('id')}/original/${this.get('file_name')}` : null
    },
    thumbnail_url: function() {
      return (!this.isNew()) ? `https://s3.amazonaws.com/${process.env.AWS_BUCKET}/assets/${this.get('id')}/thumbnail/${this.get('file_name')}` : null
    },
    resized_url: function() {
      return (!this.isNew()) ? `https://s3.amazonaws.com/${process.env.AWS_BUCKET}/assets/${this.get('id')}/resized/${this.get('file_name')}` : null
    }
  }

})
