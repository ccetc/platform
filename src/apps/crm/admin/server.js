import { Router } from 'express'
import resources from 'server/middleware/resources'
import Contact from '../models/contact'
import ContactSerializer from './serializers/contact_serializer'

var router = Router()

router.use(resources({
  path: '/contacts',
  model: Contact,
  serializer: ContactSerializer
}))

export default router
