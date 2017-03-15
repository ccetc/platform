import { route } from 'platform/middleware/rest'
import Team from 'platform/models/team'

const processor = (req, resolve, reject) => {

  Team.where({ subdomain: req.body.subdomain }).fetch({ withRelated: ['logo','strategies'] }).then(team => {

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
    console.log(err)
    return reject({ code: 422, message: 'Unable to complete request', errors: err.toJSON() })
  })

}

export default route({
  authenticated: false,
  method: 'post',
  path: '/signin/teams',
  processor,
  rules: {
    subdomain: 'required'
  }
})
