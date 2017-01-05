import { Router } from 'express'
import _ from 'lodash'
import resources from 'server/middleware/resources'
import Activity from 'platform/models/activity'
import App from 'platform/models/app'
import AppAuthor from 'platform/models/app_author'
import AppCategory from 'platform/models/app_category'
import Asset from 'platform/models/asset'
import Right from 'platform/models/right'
import Search from 'platform/models/search'
import User from 'platform/models/user'
import AppQuery from 'platform/queries/app_query'
import ActivityQuery from 'platform/queries/activity_query'
import UserQuery from 'platform/queries/user_query'
import ActivitySerializer from 'platform/serializers/activity_serializer'
import AppSerializer from 'platform/serializers/app_serializer'
import AppAuthorSerializer from 'platform/serializers/app_author_serializer'
import AppCategorySerializer from 'platform/serializers/app_category_serializer'
import AssetSerializer from 'platform/serializers/asset_serializer'
import SearchSerializer from 'platform/serializers/search_serializer'
import UserSerializer from 'platform/serializers/user_serializer'

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
  include: ['story','user.photo']
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
  query: UserQuery,
  serializer: UserSerializer,
  include: ['photo']
}))

router.get('/access', (req, res, next) => {

  Promise.all([
    App.fetchAll(),
    Right.fetchAll()
  ]).then(results => {

    const rights = results[1].reduce((rights, right) => {
      if(!rights[right.get('app_id')]) {
        rights[right.get('app_id')] = []
      }
      rights[right.get('app_id')].push({ id: right.get('id'), text: right.get('text'), description: right.get('description'), assigned: true })
      return rights
    }, {})

    const access = results[0].map(app => {
      return { id: app.get('id'), title: app.get('title'), installed: true, rights: rights[app.get('id')] || [] }
    })

    res.status(200).json(access)

  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })

})

export default router
