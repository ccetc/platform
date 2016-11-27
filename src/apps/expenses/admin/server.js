import { Router } from 'express'
import resources from 'server/middleware/resources'
import Project from '../models/project'
import Member from '../models/member'
import MemberQuery from '../queries/member_query'
import ExpenseType from '../models/expense_type'

var router = Router()

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
  name: 'expense_type',
  model: ExpenseType
}))

export default router
