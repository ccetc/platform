import Promise from 'bluebird'
import { route } from 'platform/middleware/rest'
import App from 'platform/models/app'
import Right from 'platform/models/right'
import knex from 'platform/services/knex'

const processor = (req, resolve, reject) => {

  const apps = App.query(qb => qb
    .select(knex.raw('distinct on (apps.id) apps.*, roles_apps.id is not null as installed'))
    .joinRaw('left join roles_apps on (roles_apps.app_id = apps.id and roles_apps.role_id = ?)', req.params.id)
    .orderBy('apps.id')
  ).fetchAll()

  const rights = Right.query(qb => qb
    .select(knex.raw('distinct on (rights.id) rights.*, roles_rights.id is not null as assigned'))
    .joinRaw('left join roles_rights on (roles_rights.right_id = rights.id and roles_rights.role_id = ?)', req.params.id)
    .orderBy('rights.id')
  ).fetchAll()

  Promise.all([apps, rights]).then(results => {

    const rights = results[1].reduce((rights, right) => {
      if(!rights[right.get('app_id')]) {
        rights[right.get('app_id')] = []
      }
      rights[right.get('app_id')].push({
        id: right.get('id'),
        text: right.get('text'),
        description: right.get('description'),
        assigned: right.get('assigned')
      })
      return rights
    }, {})

    const data = results[0].map(app => {
      return {
        id: app.get('id'),
        title: app.get('title'),
        assigned: app.get('assigned'),
        rights: rights[app.get('id')] || []
      }
    })

    resolve(data)

  }).catch(err => {
    reject({ code: 500, message: err.message })
  })

}

export default route({
  method: 'get',
  path: '/roles/:id/access',
  processor
})
