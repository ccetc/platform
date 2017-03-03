import { Router } from 'express'
import admin from 'admin/server'
import account from 'account/server'
import website from 'public/server'

const router = Router()

router.use(admin)
router.use(account)
router.use('/api', website)

export default router
