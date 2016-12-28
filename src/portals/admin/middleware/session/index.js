import { Router } from 'express'
import User from 'platform/models/user'
import glob from 'glob'
import path from 'path'

export const session = (req, res, next) => {

  const files = glob.sync(path.resolve(__dirname, '../../../../**/navigation.js'))
  let navigation = {}
  files.map(file => {
    const matches = file.match(/\/([a-z_]*)\/admin\/navigation\.js/)
    if(matches) navigation[matches[1]] = require(file)
  })

  User.where({ id: req.user.get('id') }).fetch({ withRelated: ['photo', 'rights', 'apps'] }).then(user => {
    res.json({
      apps: user.related('apps').reduce((menu, app) => {
        const nav = navigation[app.get('title').toLowerCase()]
        if(nav) menu.push(nav)
        return menu
      }, []),
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
