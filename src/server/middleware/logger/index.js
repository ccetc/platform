import logger from 'server/services/logger'
import _ from 'lodash'

const loggerMiddleware = (req, res, next) => {

  logger.info(`\nREQUEST: ${req.method} ${req.path}`)
  logger.info(req.headers['user-agent'])

  if(!_.isEmpty(req.query)) {
    logger.info(`QUERY: ${JSON.stringify(req.query)}`)
  }

  if(!_.isEmpty(req.body)) {
    logger.info(`BODY: ${JSON.stringify(req.body)}`)
  }

  next()

}

export default loggerMiddleware
