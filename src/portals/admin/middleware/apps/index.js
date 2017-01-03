import { Router } from 'express'
import App from 'platform/models/app'
import AppSerializer from 'platform/serializers/app_serializer'

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

export const index = (req, res, next) => {

  App.query(qb => {

    qb.column('apps.*', 'installations.team_id')

    qb.leftJoin('installations', function() {
      this.on('installations.app_id', '=', 'apps.id').andOn('installations.team_id', '=', req.team.get('id'))
    })

  }).fetchAll().then(apps => {

    const data = apps.map(record => {
      return AppSerializer(record)
    })

    res.json(data)

  }).catch(err => {

  })


}

const router = Router()
router.get('/apps', index)

export default router
