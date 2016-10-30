
import { Router } from 'express'
import users from './controllers/users'

const routes = Router()
routes.get('/users', users.index)
routes.get('/users/:id', users.show)
routes.post('/users', users.create)
routes.put('/users/:id', users.update)
routes.delete('/users/:id', users.destroy)

export default routes
