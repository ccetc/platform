import { Router } from 'express'
import admin from 'portals/admin/server'
import account from 'portals/account/server'
import website from 'portals/public/server'

const router = Router()

router.use('/api/admin', admin)
router.use('/api/account', account)
router.use('/api', website)

export default router
