
import { Router } from 'express'
import controllers from 'platform/admin/api/controllers'

const routes = Router()

routes.post('/authenticate', controllers.sessions.create)

routes.post('/reset', controllers.resets.create)
routes.get('/reset/:token', controllers.resets.claim)
routes.post('/reset/security', controllers.resets.security)
routes.post('/reset/password', controllers.resets.password)

routes.get('/activation/:token', controllers.activations.claim)
routes.post('/activation/security', controllers.activations.security)
routes.post('/activation/password', controllers.activations.password)

export default routes
