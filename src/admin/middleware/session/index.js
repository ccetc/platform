import Promise from 'bluebird'
import { route } from 'platform/middleware/rest'
import glob from 'glob'
import path from 'path'
import Notifications from 'platform/models/notification'

const processor = (req, resolve, reject)  => {

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

    resolve({
      apps,
      user: {
        id: req.user.get('id'),
        name: req.user.get('full_name'),
        initials: req.user.get('initials'),
        email: req.user.get('email'),
        photo: req.user.related('photo').get('path'),
        unread: req.user.get('unread'),
        rights: req.rights
      }
    })

  })

}

export default route({
  method: 'get',
  path: '/session',
  processor
})
