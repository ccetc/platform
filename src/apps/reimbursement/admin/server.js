import { Router } from 'express'
import resources from 'server/middleware/resources'
import Advance from '../models/advance'
import Expense from '../models/expense'
import ExpenseType from '../models/expense_type'
import Member from '../models/member'
import MemberQuery from '../queries/member_query'
import Project from '../models/project'
import Trip from '../models/trip'
import Vendor from '../models/vendor'

var router = Router()

router.use(resources({
  name: 'advance',
  model: Advance,
  include: ['user','project','expense_type']
}))

router.use(resources({
  name: 'project',
  model: Project,
  resources: [
    {
      name: 'member',
      model: Member,
      query: MemberQuery,
      include: ['user.photo']
    }
  ]
}))

router.use(resources({
  name: 'expense',
  model: Expense,
  include: ['user','project','expense_type']
}))

router.use(resources({
  name: 'expense_type',
  model: ExpenseType
}))

router.use(resources({
  name: 'trip',
  model: Trip
}))

router.use(resources({
  name: 'vendor',
  model: Vendor
}))

export default router
