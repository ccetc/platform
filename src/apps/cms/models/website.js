import model from 'platform/models/model'
import Domain from './domain'
import Node from './node'

export default model.extend({

  tableName: 'cms_websites',

  domains: function() {
    return this.hasMany(Domain, 'website_id')
  },

  nodes: function() {
    return this.hasMany(Node, 'website_id')
  }

})
