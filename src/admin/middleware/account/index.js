import { Router } from 'express'
import show from './show'
import update from './update'
import password from './password'

const router = Router()
router.get('/', show)
router.patch('/', update)
router.patch('/password', password)
export default router
