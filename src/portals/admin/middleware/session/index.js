import { Router } from 'express'
import User from 'platform/models/user'
import fs from 'fs'
import path from 'path'

const roots = ['../../../../platform','../../../../']
const navigation = {}
roots.map(function(root) {
  fs.readdirSync(path.join(__dirname, root, 'apps')).filter(function(app) {
    const appPath = path.join(__dirname, root, 'apps', app, 'admin/navigation.js')
    if(fs.existsSync(appPath)) {
      navigation[app] = require(appPath)
    }
  })
})

export const session = (req, res, next) => {
  User.where({ id: req.user.id }).fetch({ withRelated: ['photo', 'rights', 'apps'] }).then(user => {
    res.json({
      apps: user.related('apps').map(app => navigation[app.get('title').toLowerCase()]),
      user: {
        name: user.get('full_name'),
        email: user.get('email'),
        photo: user.related('photo').get('url'),
        unread: Math.floor((Math.random() * 20) + 1),
        rights: user.related('rights').map(right => right.get('text'))
      }
    })
  })
}

const router = Router()
router.get('/session', session)
export default router
