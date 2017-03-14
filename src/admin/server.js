import { Router } from 'express'
import { buildRouter } from 'platform/middleware/route'
import externalAuthentication from './middleware/external'
import client from './client'
import render from 'platform/middleware/render'
import activation from 'admin/middleware/activation'
import reset from 'admin/middleware/reset'
import signin from 'admin/middleware/signin'
import authentication from 'admin/middleware/authentication'
import session from 'admin/middleware/session'
import assets from 'admin/middleware/assets'
import account from 'admin/middleware/account'
import notifications from 'admin/middleware/notifications'
import search from 'admin/middleware/search'
import apps from 'admin/middleware/apps'
import path from 'path'

const router = Router()

router.use('/admin', externalAuthentication)

router.get('/admin/assets/:id', (req, res) => {
  res.sendFile(path.join('.', 'uploads', req.params.id))
})

router.get('/admin*', render(client))

router.use('/api/admin/activation', activation)

router.use('/api/admin/reset', reset)

router.use('/api/admin/signin', signin)

router.use('/api/admin', authentication)

router.use('/api/admin', notifications.router)

router.use('/api/admin', assets)

const adminRoutes = [
  ...account,
  session,
  search
]

router.use(buildRouter(adminRoutes))

router.use('/api/admin', apps)

export default router
