import { Router } from 'express'
import service from 'server/middleware/service'
import contact from '../models/contact'

var router = Router()

router.use('/contacts', service(contact))

export default router
