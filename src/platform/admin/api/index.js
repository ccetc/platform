
import { Router } from 'express'
import controllers from 'platform/admin/api/controllers'

const routes = Router()

routes.get('/search', controllers.search.index)

routes.get('/users', controllers.users.index)
routes.get('/users/:id', controllers.users.show)
routes.post('/users', controllers.users.create)
routes.patch('/users/:id', controllers.users.update)
routes.delete('/users/:id', controllers.users.destroy)

export default routes