
import { Router } from 'express'
import controllers from './controllers'

const routes = Router()

routes.get('/advances', controllers.advances.index)
routes.get('/advances/:id', controllers.advances.show)
routes.post('/advances', controllers.advances.create)
routes.put('/advances/:id', controllers.advances.update)
routes.delete('/advances/:id', controllers.advances.destroy)

routes.get('/expense_types', controllers.expense_types.index)
routes.get('/expense_types/:id', controllers.expense_types.show)
routes.post('/expense_types', controllers.expense_types.create)
routes.put('/expense_types/:id', controllers.expense_types.update)
routes.delete('/expense_types/:id', controllers.expense_types.destroy)

routes.get('/expenses', controllers.expenses.index)
routes.get('/expenses/:id', controllers.expenses.show)
routes.post('/expenses', controllers.expenses.create)
routes.put('/expenses/:id', controllers.expenses.update)
routes.delete('/expenses/:id', controllers.expenses.destroy)

routes.get('/members', controllers.members.index)
routes.get('/members/:id', controllers.members.show)
routes.post('/members', controllers.members.create)
routes.put('/members/:id', controllers.members.update)
routes.delete('/members/:id', controllers.members.destroy)

routes.get('/projects', controllers.projects.index)
routes.get('/projects/:id', controllers.projects.show)
routes.post('/projects', controllers.projects.create)
routes.put('/projects/:id', controllers.projects.update)
routes.delete('/projects/:id', controllers.projects.destroy)

routes.get('/trips', controllers.trips.index)
routes.get('/trips/:id', controllers.trips.show)
routes.post('/trips', controllers.trips.create)
routes.put('/trips/:id', controllers.trips.update)
routes.delete('/trips/:id', controllers.trips.destroy)

routes.get('/vendors', controllers.vendors.index)
routes.get('/vendors/:id', controllers.vendors.show)
routes.post('/vendors', controllers.vendors.create)
routes.put('/vendors/:id', controllers.vendors.update)
routes.delete('/vendors/:id', controllers.vendors.destroy)

export default routes
