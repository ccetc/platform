import React from 'react'
import { Route } from 'react-router'
import CategoryIndex from './views/categories/index'
import CompetencyIndex from './views/competencies/index'
import ResourcesIndex from './views/resources/index'
import ResourcesShow from './views/resources/show'

const routes = (
  <Route>
    <Route path="categories" component={ CategoryIndex } />
    <Route path="competencies" component={ CompetencyIndex } />
    <Route path="resources" component={ ResourcesIndex } />
    <Route path="resources/:id" component={ ResourcesShow } />
  </Route>
)

export default routes
