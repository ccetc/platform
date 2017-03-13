import resources from 'platform/middleware/resources'
import ExpenseType from '../../../models/expense_type'

export default resources({
  allowedParams: ['title','code','description'],
  defaultSort: 'code',
  name: 'expense_type',
  model: ExpenseType,
  rights: ['expenses.manage_configuration'],
  searchParams: ['code','title','description'],
  sortParams: ['title','code']
})
