import { Router } from 'express'
import resumable from './resumable'
import multipart from 'connect-multiparty'

const router = Router()

router.use(multipart())

router.post('/uploads', (req, res) => {
  resumable.post(req, (status, filename, original_filename, identifier) => {
    res.send(status)
  })
})

router.get('/uploads', (req, res) => {
  resumable.get(req, (status, filename, original_filename, identifier) => {
    res.send((status === 'found' ? 200 : 404), status)
  })
})

export default router
