import React from 'react'
import { IndexRoute, Route } from 'react-router'
import advances from './views/advances'
import ExpenseTypesIndex from './views/expense_types/index'
import ExpenseTypesShow from './views/expense_types/show'
import expenses from './views/expenses'
import ProjectsIndex from './views/projects/index'
import ProjectsShow from './views/projects/show'
import trips from './views/trips'
import vendors from './views/vendors'

const routes = (
  <Route>
    {advances}
    <Route path="expense_types">
      <IndexRoute component={ExpenseTypesIndex} />
      <Route path=":id" component={ExpenseTypesShow} />
    </Route>
    {expenses}
    <Route path="projects">
      <IndexRoute component={ProjectsIndex} />
      <Route path=":id" component={ProjectsShow} />
    </Route>
    {trips}
    {vendors}
  </Route>
)

export default routes
