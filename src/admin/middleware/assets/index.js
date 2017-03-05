import { Router } from 'express'
import { test, upload } from './resumable'
import multipart from 'connect-multiparty'

const router = Router()

router.use(multipart())

router.get('/', (req, res) => {
  test(req, (status) => {
    res.status((status === 'found' ? 200 : 404), ).send(status)
  })
})

router.post('/', (req, res) => {
  upload(req, (status, filename, original_filename, identifier) => {
    res.status(200).send(status)
  })
})

export default router
