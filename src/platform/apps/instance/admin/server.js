import { Router } from 'express'
import resources from 'server/middleware/resources'
import App from 'platform/models/app'
import Asset from 'platform/models/asset'
import Search from 'platform/models/search'
import User from 'platform/models/user'
import AppSerializer from 'platform/serializers/app_serializer'
import AssetSerializer from 'platform/serializers/asset_serializer'
import SearchSerializer from 'platform/serializers/search_serializer'
import UserSerializer from 'platform/serializers/user_serializer'

const admin = Router()

admin.use(resources({
  name: 'app',
  path: 'apps',
  model: App,
  serializer: AppSerializer
}))

admin.use(resources({
  name: 'asset',
  path: 'assets',
  model: Asset,
  serializer: AssetSerializer
}))

admin.use(resources({
  name: 'search',
  path: 'searches',
  model: Search,
  serializer: SearchSerializer,
  only: ['find','create','remove']
}))

admin.use(resources({
  name: 'user',
  path: 'users',
  model: User,
  serializer: UserSerializer,
  include: ['photo']
}))

export default admin
