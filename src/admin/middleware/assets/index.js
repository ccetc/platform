import { Router } from 'express'
import { test, upload } from './resumable'
import multiparty from 'connect-multiparty'
import resource from 'platform/middleware/resources'
import Asset from 'platform/models/asset'
import AssetSerializer from 'platform/serializers/asset_serializer'

const router = Router()

router.use(resource({
  model: Asset,
  name: 'asset',
  only: 'list',
  serializer: AssetSerializer
}).router)

router.use(multiparty({ uploadDir: './tmp' }))

router.get('/assets', (req, res) => {

  return test(req).then(result => {
    res.status(200).send(result)
  }).catch(error => {
    res.status(404).send(error.message)
  })

})

router.post('/assets', (req, res) => {

  return upload(req).then(result => {
    res.status(200).send(result)
  }).catch(error => {
    res.status(404).send(error.message)
  })

})

export default router
