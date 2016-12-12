import { Router } from 'express'
import Team from 'platform/models/team'

const team = Router()

team.get('/team', (req, res, next) => {
  return Team.where({ id: 1 }).fetch().then(team => {
    return res.status(200).json({
      id: team.get('id'),
      title: team.get('title'),
      subtitle: team.get('subtitle'),
      logo: '/images/cornell.png'
      // logo: team.related('logo').get('url')
    })
  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })
})

export default team
