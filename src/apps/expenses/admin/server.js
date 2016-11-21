import { Router } from 'express'
import service from 'middleware/service'
import project from '../models/project'

var router = Router()

router.use('/projects', service(project))

export default router
