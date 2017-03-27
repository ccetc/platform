import model from 'platform/models/model'
import ContentType from './content_type'
import Revision from './revision'
import Website from './website'

export default model.extend({

  tableName: 'cms_nodes',

  content_type: function() {
    return this.belongsTo(ContentType, 'content_type_id')
  },

  revisions: function() {
    return this.hasMany(Revision, 'node_id')
  },

  website: function() {
    return this.belongsTo(Website, 'website_id')
  }

})
