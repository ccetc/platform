
import { Router } from 'express'
import advances from './controllers/advances_controller'
import expense_types from './controllers/expense_types_controller'
import expenses from './controllers/expenses_controller'
import members from './controllers/members_controller'
import projects from './controllers/projects_controller'
import trips from './controllers/trips_controller'
import vendors from './controllers/vendors_controller'

const routes = Router()

routes.get('/advances', advances.index)
routes.get('/advances/:id', advances.show)
routes.post('/advances', advances.create)
routes.put('/advances/:id', advances.update)
routes.delete('/advances/:id', advances.destroy)

routes.get('/expense_types', expense_types.index)
routes.get('/expense_types/:id', expense_types.show)
routes.post('/expense_types', expense_types.create)
routes.put('/expense_types/:id', expense_types.update)
routes.delete('/expense_types/:id', expense_types.destroy)

routes.get('/expenses', expenses.index)
routes.get('/expenses/:id', expenses.show)
routes.post('/expenses', expenses.create)
routes.put('/expenses/:id', expenses.update)
routes.delete('/expenses/:id', expenses.destroy)

routes.get('/members', members.index)
routes.get('/members/:id', members.show)
routes.post('/members', members.create)
routes.put('/members/:id', members.update)
routes.delete('/members/:id', members.destroy)

routes.get('/projects', projects.index)
routes.get('/projects/:id', projects.show)
routes.post('/projects', projects.create)
routes.put('/projects/:id', projects.update)
routes.delete('/projects/:id', projects.destroy)

routes.get('/trips', trips.index)
routes.get('/trips/:id', trips.show)
routes.post('/trips', trips.create)
routes.put('/trips/:id', trips.update)
routes.delete('/trips/:id', trips.destroy)

routes.get('/vendors', vendors.index)
routes.get('/vendors/:id', vendors.show)
routes.post('/vendors', vendors.create)
routes.put('/vendors/:id', vendors.update)
routes.delete('/vendors/:id', vendors.destroy)

export default routes
