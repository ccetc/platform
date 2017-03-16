import { resources } from 'platform/middleware/rest'
import ExpenseType from '../../../models/expense_type'

export default resources({
  actions: {
    test: {
      on: 'member',
      method: 'get',
      path: 'foo',
      processor: (req, resolve, reject) => {
        resolve({ foo: 'bar' })
      },
      activity: (req, result, resolve, reject) => {
        resolve({
          text: 'approved {object1} in {object2}',
          object1_type: 'expense',
          object1_text: 'Foo',
          object2_type: 'project',
          object2_text: 'Bar'
        })
      },
      notification: (req, result, resolve, reject) => {
        resolve({
          user_ids: [72,73,74],
          subject_id: req.user.get('id'),
          text: 'approved {object1} in {object2}',
          url: '/admin/expenses/expenses/1',
          object1_description: 'your expense',
          object1_text: 'Foo',
          object2_description: 'the project',
          object2_text: 'Bar'
        })
      }
    }
  },
  allowedParams: ['title','code','description'],
  defaultSort: 'code',
  model: ExpenseType,
  name: 'expense_type',
  rights: ['expenses.manage_configuration'],
  searchParams: ['code','title','description'],
  sortParams: ['title','code']
})
