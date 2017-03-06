import { Router } from 'express'
import { test, upload } from './resumable'
import multiparty from 'connect-multiparty'

const router = Router()

router.use(multiparty({ uploadDir: './tmp' }))

router.get('/', (req, res) => {

  return test(req).then(result => {
    res.status(200).send(result)
  }).catch(error => {
    res.status(404).send(error.message)
  })

})

router.post('/', (req, res) => {

  return upload(req).then(result => {
    res.status(200).send(result)
  }).catch(error => {
    res.status(404).send(error.message)
  })

})

export default router
