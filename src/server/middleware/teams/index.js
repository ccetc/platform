import Team from 'platform/models/team'

export default (req, res, next) => {

  return Team.query(qb => {

    qb.where({ id: 1 })

  }).fetch().then(team => {

    req.team = team
    return next()

  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })

}
