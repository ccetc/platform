import glob from 'glob'
import path from 'path'
import Notifications from 'platform/models/notification'
import { succeed } from 'platform/utils/responses'

export default (req, res, next) => {

  const files = glob.sync(path.resolve(__dirname, '../../../apps/*/admin/navigation.js'))
  let navigation = {}
  files.map(file => {
    const matches = file.match(/\/([a-z_]*)\/admin\/navigation\.js/)
    if(matches) navigation[matches[1]] = require(file)
  })

  const apps = Object.keys(req.apps).reduce((menu, app) => {
    const nav = navigation[app]
    if(nav) menu.push(nav)
    return menu
  }, [])

  Notifications.where({ user_id : req.user.get('id'), is_read: false }).fetchAll().then(notifications => {

    const data = {
      apps,
      user: {
        name: req.user.get('full_name'),
        initials: req.user.get('initials'),
        email: req.user.get('email'),
        photo: req.user.related('photo').get('url'),
        unread: notifications.length,
        rights: req.rights
      }
    }

    succeed(res, 200, '', { data })

  })


}
