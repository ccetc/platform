import React from 'react'
import { Route } from 'react-router'
import ResourcesIndex from './views/resources/index'
import SkillsIndex from './views/skills/index'

const routes = (
  <Route>
    <Route path="resources" component={ ResourcesIndex } />
    <Route path="skills" component={ SkillsIndex } />
  </Route>
)

export default routes
