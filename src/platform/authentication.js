
import { Router } from 'express'
import controllers from './controllers'

const routes = Router()

routes.post('/authenticate', controllers.sessions.create)
routes.post('/reset', controllers.resets.create)

export default routes
