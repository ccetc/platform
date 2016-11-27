import { Router } from 'express'
import resources from 'server/middleware/resources'
import Project from '../models/project'

var router = Router()

router.use(resources({
  path: '/projects',
  model: Project
}))

export default router
