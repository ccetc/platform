import passport from 'services/passport'
import Error from 'utils/error'
import logger from 'services/logger'

const authentication = (req, res, next) => {

  passport('user_id').authenticate('jwt', { session: false }, (err, user, info) => {

    if(err) {
      const error = new Error({ code: 401, message: 'unable to load user' })
      return next(error)
    }

    if(!user) {
      const error = new Error({ code: 401, message: info.message })
      return next(error)
    }

    logger.info(`USER: ${JSON.stringify({ id: user.get('id'), email: user.get('email')})}`)

    req.user = user
    next()
    return null

  })(req, res, next)

}

export default authentication
