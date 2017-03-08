import { Router } from 'express'
import { test, upload } from './resumable'
import { succeed, fail } from 'platform/utils/responses'
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

router.get('/assets/upload', (req, res) => {

  return test(req).then(data => {
    succeed(res, 200, '', { data })
  }).catch(error => {
    fail(res, 404, error.message)
  })

})

router.post('/assets/upload', (req, res) => {

  return upload(req).then(data => {
    succeed(res, 200, '', { data })
  }).catch(error => {
    fail(res, 404, error.message)
  })

})

export default router
