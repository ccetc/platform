import Promise from 'bluebird'
import User from 'platform/models/user'

export default filters => {
  return new Promise((resolve, reject) => {
    User.query(qb => {

      const term = `%${filters.q.toLowerCase()}%`
      qb.whereRaw('(LOWER(first_name) LIKE ? OR LOWER(last_name) LIKE ? OR LOWER(email) LIKE ?)', [term,term,term])

    }).fetchAll({ withRelated: ['photo'] }).then(results => {

      const json = results.map(result => ({
        text: result.get('full_name'),
        subtext: result.get('email'),
        route: `/admin/team/users/${result.get('id')}`
      }))

      resolve(json)

    }).catch(reject)
  })
}
