import services from '../../services'

const expense_type = services.bookshelf.Model.extend({

  tableName: 'expense_types',

  hasTimestamps: ['created_at', 'updated_at']

})

export default expense_type
