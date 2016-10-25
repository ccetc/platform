
import { Router } from 'express'
import contacts from './controllers/contacts'

const routes = Router()
routes.get('/contacts', contacts.index)
routes.get('/contacts/:id', contacts.show)
routes.post('/contacts', contacts.create)
routes.put('/contacts/:id', contacts.update)
routes.delete('/contacts/:id', contacts.destroy)

export default routes
