import { Router } from 'express'
import resources from 'server/middleware/resources'
import Activity from 'platform/models/activity'
import App from 'platform/models/app'
import Asset from 'platform/models/asset'
import Search from 'platform/models/search'
import User from 'platform/models/user'
import ActivitySerializer from 'platform/serializers/activity_serializer'
import AppSerializer from 'platform/serializers/app_serializer'
import AssetSerializer from 'platform/serializers/asset_serializer'
import SearchSerializer from 'platform/serializers/search_serializer'
import UserSerializer from 'platform/serializers/user_serializer'

const router = Router()

router.use(resources({
  name: 'activity',
  path: 'activities',
  model: Activity,
  serializer: ActivitySerializer,
  include: ['story','user.photo'],
  find: {
    query: {
      $sort: '-created_at'
    }
  }
}))

router.use(resources({
  name: 'asset',
  path: 'assets',
  model: Asset,
  serializer: AssetSerializer
}))

router.use(resources({
  name: 'search',
  path: 'searches',
  model: Search,
  serializer: SearchSerializer,
  only: ['find','create','remove']
}))

router.use(resources({
  name: 'user',
  path: 'users',
  model: User,
  serializer: UserSerializer,
  include: ['photo']
}))

export default router
