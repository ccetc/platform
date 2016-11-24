import { Router } from 'express'
import service from 'server/middleware/service'
import Contact from '../models/contact'
import ContactSerializer from './serializers/contact_serializer'

var router = Router()

router.use('/contacts', service(Contact, { serializer: ContactSerializer }))

export default router
