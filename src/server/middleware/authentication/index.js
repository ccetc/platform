import passport from 'server/services/passport'
import Error from 'server/utils/error'
import logger from 'server/services/logger'

const authentication = (req, res, next) => {

  return passport('user_id').authenticate('jwt', { session: false }, (err, user, info) => {

    if(err) {
      const error = new Error({ code: 401, message: 'unable to load user' })
      return next(error)
    }

    if(!user) {
      const error = new Error({ code: 401, message: info.message })
      return next(error)
    }

    const team = user.related('team')

    logger.info(`USER: ${JSON.stringify({ id: user.get('id'), email: user.get('email')})}`)
    logger.info(`TEAM: ${JSON.stringify({ id: team.get('id'), email: team.get('title')})}`)

    req.user = user
    req.team = team
    req.jwt = info

    next()
    return null

  })(req, res, next)

}

export default authentication
