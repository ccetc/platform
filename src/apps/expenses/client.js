import React from 'react'
import { Route } from 'react-router'
import advances from './views/advances'
import expense_types from './views/expense_types'
import expenses from './views/expenses'
import projects from './views/projects'
import trips from './views/trips'
import vendors from './views/vendors'

const routes = (
  <Route>
    {advances}
    {expense_types}
    {expenses}
    {projects}
    {trips}
    {vendors}
  </Route>
)

export default routes
