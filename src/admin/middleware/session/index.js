import Promise from 'bluebird'
import route from 'platform/middleware/route'
import glob from 'glob'
import path from 'path'
import Notifications from 'platform/models/notification'

const processor = (req) => {

  return new Promise((resolve, reject) => {

    const files = glob.sync(path.resolve(__dirname, '../../../apps/*/admin/navigation.js'))

    const navigation = files.reduce((navigation, file) => {
      const matches = file.match(/\/([a-z_]*)\/admin\/navigation\.js/)
      if(matches) {
        return {
          ...navigation,
          [matches[1]]: require(file).default
        }
      }
    }, {})

    return Promise.reduce(Object.keys(req.apps), (menu, app) => {
      return navigation[app](req).then(nav => {
        return [
          ...menu,
          nav
        ]
      })
    }, []).then(apps => {

      return Notifications.where({ user_id : req.user.get('id'), is_read: false }).fetchAll().then(notifications => {

        const data = {
          apps,
          user: {
            name: req.user.get('full_name'),
            initials: req.user.get('initials'),
            email: req.user.get('email'),
            photo: req.user.related('photo').get('thumbnail_url'),
            unread: notifications.length,
            rights: req.rights
          }
        }

        resolve(data)

      })
    })

  })

}

export default route({
  method: 'get',
  path: '/api/admin/session',
  processor
})
