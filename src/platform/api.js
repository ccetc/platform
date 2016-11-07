
import { Router } from 'express'
import controllers from './controllers'

const routes = Router()

routes.post('/authenticate', controllers.sessions.create)
routes.post('/reset', controllers.resets.create)

routes.get('/users', controllers.users.index)
routes.get('/users/:id', controllers.users.show)
routes.post('/users', controllers.users.create)
routes.patch('/users/:id', controllers.users.update)
routes.delete('/users/:id', controllers.users.destroy)

export default routes
