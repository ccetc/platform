import { Router } from 'express'
import resources from 'server/middleware/resources'
import Project from '../models/project'
import ExpenseType from '../models/expense_type'

var router = Router()

router.use(resources({
  path: '/projects',
  model: Project
}))
router.use(resources({
  path: '/expense_types',
  model: ExpenseType
}))

export default router
