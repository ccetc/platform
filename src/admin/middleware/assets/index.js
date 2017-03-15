import { test, upload } from './resumable'
import path from 'path'
import resource from 'platform/middleware/resources'
import route from 'platform/middleware/route'
import multiparty from 'connect-multiparty'
import Asset from 'platform/models/asset'
import AssetSerializer from 'platform/serializers/asset_serializer'

const assets = resource({
  model: Asset,
  name: 'asset',
  only: 'list',
  serializer: AssetSerializer
})

const multipartyRoute = {
  method: 'use',
  path: '/assets*',
  handler: multiparty({ uploadDir: './tmp' })
}

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
  processor: (req) => {
    return new Promise((resolve, reject) => {
      test(req).then(data => {
        resolve(data)
      }).catch(err=> {
        reject({ code: 404, message: err.message })
      })
    })
  }
})

const uploadRoute = route({
  method: 'post',
  path: '/assets/upload',
  processor: (req) => {
    return new Promise((resolve, reject) => {
      upload(req).then(data => {
        resolve(data)
      }).catch(err=> {
        reject({ code: 404, message: err.message })
      })
    })
  }
})

export default [
  ...assets.routes,
  multipartyRoute,
  testRoute,
  uploadRoute,
  previewRoute
]
