import { test, upload } from './resumable'
import path from 'path'
import { resources } from 'platform/middleware/rest'
import { route } from 'platform/middleware/rest'
import Asset from 'platform/models/asset'
import AssetSerializer from 'platform/serializers/asset_serializer'

const assets = resources({
  model: Asset,
  name: 'asset',
  only: 'list',
  serializer: AssetSerializer
})

const previewRoute = route({
  method: 'get',
  path: '/assets/:id',
  handler: (req, res) => {
    res.sendFile(path.join('.', 'uploads', req.params.id))
  }
})

const testRoute = route({
  method: 'get',
  path: '/assets/upload',
  processor: (req, resolve, reject) => {
    test(req).then(data => {
      resolve(data)
    }).catch(err=> {
      reject({ code: 404, message: err.message })
    })
  }
})

const uploadRoute = route({
  method: 'post',
  path: '/assets/upload',
  processor: (req, resolve, reject) => {
    upload(req).then(data => {
      resolve(data)
    }).catch(err=> {
      reject({ code: 404, message: err.message })
    })
  }
})

export default [
  ...assets,
  testRoute,
  uploadRoute,
  previewRoute
]
