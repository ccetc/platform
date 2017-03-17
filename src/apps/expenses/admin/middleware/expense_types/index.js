import { resources } from 'platform/middleware/rest'
import ExpenseType from '../../../models/expense_type'

export default resources({
  allowedParams: ['title','code','description'],
  defaultSort: 'code',
  model: ExpenseType,
  name: 'expense_type',
  rights: ['expenses.manage_configuration'],
  searchParams: ['code','title','description'],
  sortParams: ['title','code']
})
