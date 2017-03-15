import route from 'platform/middleware/route'
import Checkit from 'checkit'
import Team from 'platform/models/team'

export default route({
  authenticated: false,
  method: 'get',
  path: '/signin/teams',
  processor: (req, resolve, reject) => {

    Checkit({
      subdomain: 'required'
    }).run(req.query).then(fields => {

      Team.where({ subdomain: req.query.subdomain }).fetch({ withRelated: ['logo','strategies'] }).then(team => {

        if(!team) {
          return reject({ code: 404, message: 'Unable to find this domain' })
        }

        const strategies = team.related('strategies').toJSON().map(strategy => {
          return strategy.name
        })

        const data = {
          id: team.get('id'),
          title: team.get('title'),
          subdomain: team.get('subdomain'),
          logo: team.related('logo').get('url'),
          strategies
        }

        resolve(data)

      }).catch(err => {
        return reject({ code: 422, message: 'Unable to complete request', data: err.toJSON() })
      })

    }).catch(err => {
      return reject({ code: 422, message: 'Unable to complete request', data: err.toJSON() })
    })

  }
})
