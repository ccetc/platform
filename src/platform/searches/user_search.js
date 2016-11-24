import UserQuery from '../queries/user_query'
import User from '../models/user'

export default (query) => {
  return new Promise((resolve, reject) => {
    UserQuery(User, query).fetchAll().then(results => {
      const json = results.map(result => ({
        id: result.get('id'),
        name: result.get('full_name'),
        email: result.get('email'),
        route: `/admin/instance/users/${result.get('id')}`
      }))
      resolve(json)
    }).catch(err => {
      reject(err)
    })
  })
}
