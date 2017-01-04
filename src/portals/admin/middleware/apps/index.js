import { Router } from 'express'
import resources from 'server/middleware/resources'
import App from 'platform/models/app'
import AppAuthor from 'platform/models/app_author'
import AppCategory from 'platform/models/app_category'
import AppSerializer from 'platform/serializers/app_serializer'
import AppQuery from 'platform/queries/app_query'
import AppAuthorSerializer from 'platform/serializers/app_author_serializer'
import AppCategorySerializer from 'platform/serializers/app_category_serializer'

// import fs from 'fs'
// import path from 'path'
// let apps = {}
// const roots = ['../../../../platform/apps', '../../../../apps', '../../../../workbench']
// roots.map(root => {
//   if(fs.existsSync(path.join(__dirname, root))) {
//     fs.readdirSync(path.join(__dirname, root)).filter(app => {
//       const config = path.join(__dirname, root, app, 'app.json')
//       if(fs.existsSync(config)) {
//         apps[app] = require(config)
//       }
//     })
//   }
// })


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

export default router
