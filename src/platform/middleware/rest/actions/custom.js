import { defaultAuthenticator, defaultAuthorizer, defaultLogger, defaultRenderer, defaultResponder } from '../utils/defaults'

export default (options) => {

  return {
    authenticator: defaultAuthenticator(options),
    authorizer: defaultAuthorizer(options),
    logger: defaultLogger(options),
    renderer: defaultRenderer(options, options.serializer),
    responder: defaultResponder(200, 'Success')
  }

}
