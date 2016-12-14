import { Router } from 'express'
import Team from 'platform/models/team'

const team = Router()

team.get('/teams', (req, res, next) => {
  return Team.where({ subdomain: req.query.subdomain }).fetch({ withRelated: ['logo'] }).then(team => {

    if(!team) {
      const error = new Error({ code: 404, message: 'Unable to find this domain' })
      return next(error)
    }

    return res.status(200).json({
      id: team.get('id'),
      title: team.get('title'),
      subdomain: team.get('subdomain'),
      logo: team.related('logo').get('url')
    })

  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })

})

export default team
