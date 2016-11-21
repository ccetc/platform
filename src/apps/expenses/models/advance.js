import services from '../../services'

const advance = services.bookshelf.Model.extend({

  tableName: 'advances',

  hasTimestamps: ['created_at', 'updated_at']

})

export default advances
