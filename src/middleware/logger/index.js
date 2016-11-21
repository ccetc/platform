import logger from 'services/logger'
import _ from 'lodash'

const loggerMiddleware = (req, res, next) => {

  logger.info(`\nREQUEST: ${req.method} ${req.path}`)

  if(!_.isEmpty(req.query)) {
    logger.info(`QUERY: ${JSON.stringify(req.query)}`)
  }

  if(!_.isEmpty(req.body)) {
    logger.info(`BODY: ${JSON.stringify(req.body)}`)
  }

  next()

}

export default loggerMiddleware
