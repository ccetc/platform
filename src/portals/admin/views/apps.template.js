import React from 'react'
import { Route, IndexRoute } from 'react-router'
import Transition from './transition'
import Panel from './panel'
import Dashboard from './dashboard'
import NotFound from './not_found'
<% for (var app of apps) { %>import <%= app.name %> from '<%= app.filepath %>/admin/client.js'
<% } %>
export default (
  <Route component={ Transition }>
    <Route component={ Panel }>
      <IndexRoute component={ Dashboard } />
      <% for (var app of apps) { %><Route path="<%= app.path %>">
        { <%= app.name %> }
      </Route>
      <% } %><Route path="*" component={ NotFound }/>
    </Route>
  </Route>
)
