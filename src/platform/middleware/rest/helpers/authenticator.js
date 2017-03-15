import moment from 'moment'
import knex from 'platform/services/knex'
import passport from 'platform/services/passport'
import App from 'platform/models/app'
import Installation from 'platform/models/installation'
import Right from 'platform/models/right'

export default (options) => {

  return (req) => {

    if(!options.authenticated) return true

    return new Promise((resolve, reject) => {

      passport('user_id').authenticate('jwt', { session: false }, (err, user, info) => {

        if(err) {
          return reject({ code: 401, message: 'Unable to find user'  })
        }

        if(!user) {
          return reject({ code: 401, message: info.message })
        }

        knex('users').where({ id: user.get('id') }).update({ last_online_at: moment() }).then(() => {

          req.jwt = info
          req.team = user.related('team')
          req.user = user
          resolve(user)

        })

      })(req)

    }).then(user => {

      return new Promise((resolve, reject) => {

        const apps = () => App.fetchAll()

        const installations = () => Installation.query(qb => qb
          .select(knex.raw('distinct on (installations.app_id) installations.*'))
          .innerJoin('roles_apps', 'roles_apps.app_id', 'installations.app_id')
          .innerJoin('users_roles', 'users_roles.role_id', 'roles_apps.role_id')
          .where('users_roles.user_id', '=', req.user.get('id'))).fetchAll()

        const rights = () => Right.query(qb => qb
          .select(knex.raw('distinct on (rights.id) rights.*'))
          .innerJoin('roles_rights', 'roles_rights.right_id', 'rights.id')
          .innerJoin('users_roles', 'users_roles.role_id', 'roles_rights.role_id')
          .where('users_roles.user_id', '=', req.user.get('id'))).fetchAll()

        return Promise.all([apps(), installations(), rights()]).then(results => {

          const appMap = results[0].reduce((apps, app) => ({
            ...apps,
            [app.get('id')]: app
          }), {})

          req.apps = results[1].reduce((apps, installation) => {
            return {
              ...apps,
              [appMap[installation.get('app_id')].get('title').toLowerCase()]: installation.get('settings')
            }
          }, {})

          req.rights = results[2].map(right => {
            const app = appMap[right.get('app_id')]
            return app.get('title').toLowerCase() + '.' + right.get('text').toLowerCase().replace(/\s/, '_')
          })

          resolve()

        }).catch(err => {

          reject({ code: 500, message: err.message })

        })

      })

    })

  }

}
