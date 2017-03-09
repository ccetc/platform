import { Router } from 'express'
import show from './show'
import update from './update'
import photo from './photo'
import password from './password'

const router = Router()
router.get('/', show)
router.patch('/', update)
router.patch('/photo', photo)
router.patch('/password', password)
export default router
