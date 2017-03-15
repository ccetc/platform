import { buildRouter } from 'platform/middleware/rest'
import externalAuthentication from './middleware/external'
import client from './client'
import render from 'platform/middleware/render'
import activate from 'admin/middleware/activate'
import reset from 'admin/middleware/reset'
import signin from 'admin/middleware/signin'
import session from 'admin/middleware/session'
import assets from 'admin/middleware/assets'
import account from 'admin/middleware/account'
import notifications from 'admin/middleware/notifications'
import search from 'admin/middleware/search'
import apps from 'admin/middleware/apps'

const externalAuthenticationRoute = {
  method: 'use',
  path: '/',
  handler: externalAuthentication
}

const renderRoute = {
  method: 'get',
  path: '*',
  handler: render(client)
}

export const adminRoutes = [
  externalAuthenticationRoute,
  renderRoute
]

export const apiRoutes = [
  ...signin,
  ...reset,
  ...activate,
  ...notifications.routes,
  ...account,
  ...assets,
  session,
  search,
  ...apps
]

export default buildRouter([
  {
    prefix: '/admin',
    routes: adminRoutes
  }, {
    prefix: '/api/admin',
    routes: apiRoutes
  }
])
