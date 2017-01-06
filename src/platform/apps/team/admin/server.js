import { Router } from 'express'
import resources from 'server/middleware/resources'
import Activity from 'platform/models/activity'
import App from 'platform/models/app'
import AppAuthor from 'platform/models/app_author'
import AppCategory from 'platform/models/app_category'
import Asset from 'platform/models/asset'
import Role from 'platform/models/role'
import Search from 'platform/models/search'
import User from 'platform/models/user'
import AppQuery from 'platform/queries/app_query'
import ActivityQuery from 'platform/queries/activity_query'
import RoleQuery from 'platform/queries/role_query'
import UserQuery from 'platform/queries/user_query'
import ActivitySerializer from 'platform/serializers/activity_serializer'
import AppSerializer from 'platform/serializers/app_serializer'
import AppAuthorSerializer from 'platform/serializers/app_author_serializer'
import AppCategorySerializer from 'platform/serializers/app_category_serializer'
import AssetSerializer from 'platform/serializers/asset_serializer'
import RoleSerializer from 'platform/serializers/role_serializer'
import SearchSerializer from 'platform/serializers/search_serializer'
import UserSerializer from 'platform/serializers/user_serializer'
import FindAccess from './middleware/find_access'

const router = Router()

router.use(resources({
  name: 'app_category',
  path: 'apps/categories',
  model: AppCategory,
  serializer: AppCategorySerializer,
  team: false
}))

router.use(resources({
  name: 'app_author',
  path: 'apps/authors',
  model: AppAuthor,
  serializer: AppAuthorSerializer,
  team: false
}))

router.use(resources({
  name: 'app',
  path: 'apps',
  model: App,
  query: AppQuery,
  serializer: AppSerializer,
  team: false,
  include: ['author','category'],
  filter: (qb, req) => qb
   .column('apps.*', 'installations.team_id')
   .leftJoin('installations', function() {
     this.on('installations.app_id', '=', 'apps.id').andOn('installations.team_id', '=', req.team.get('id'))
   })
   .groupBy('apps.id','installations.team_id')
}))


router.use(resources({
  name: 'activity',
  path: 'activities',
  model: Activity,
  query: ActivityQuery,
  serializer: ActivitySerializer,
  include: ['story','user.photo','app']
}))

router.use(resources({
  name: 'asset',
  path: 'assets',
  model: Asset,
  serializer: AssetSerializer
}))

router.use(resources({
  name: 'role',
  path: 'roles',
  model: Role,
  query: RoleQuery,
  serializer: RoleSerializer,
  include: ['users.photo']
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
  query: UserQuery,
  serializer: UserSerializer,
  include: ['photo','roles']
}))

router.get('/access', FindAccess)

export default router
