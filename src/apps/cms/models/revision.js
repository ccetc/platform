import model from 'platform/models/model'
import Node from './node'
import Website from './website'

export default model.extend({

  tableName: 'cms_revisions',

  node: function() {
    return this.belongsTo(Node, 'node_id')
  },

  website: function() {
    return this.belongsTo(Website, 'website_id')
  }

})
