import { Router } from 'express'
import resources from 'server/middleware/resources'
import App from 'platform/models/app'
import Asset from 'platform/models/asset'
import User from 'platform/models/user'
import AppSerializer from 'platform/serializers/app_serializer'
import AssetSerializer from 'platform/serializers/asset_serializer'
import UserSerializer from 'platform/serializers/user_serializer'

const admin = Router()

admin.use(resources({
  path: '/apps',
  model: App,
  serializer: AppSerializer
}))

admin.use(resources({
  path: '/assets',
  model: Asset,
  serializer: AssetSerializer
}))

admin.use(resources({
  path: '/users',
  model: User,
  serializer: UserSerializer,
  include: ['photo']
}))

export default admin
