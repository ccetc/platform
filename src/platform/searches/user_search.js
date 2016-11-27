import Promise from 'bluebird'
import UserQuery from '../queries/user_query'
import User from '../models/user'

export default filters => {
  return new Promise((resolve, reject) => {
    User.query(qb => {
      qb = UserQuery(qb, filters)
    }).fetchAll().then(results => {
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
