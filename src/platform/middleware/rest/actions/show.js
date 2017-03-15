import { defaultAuthenticator, defaultAuthorizer, defaultRenderer, defaultResponder } from '../utils/defaults'
import load from '../helpers/load'

export default options => {

  const processor = (req, resolve, reject) => load('show', options)(req).then(resolve)

  return {
    authenticator: defaultAuthenticator(options),
    authorizer: defaultAuthorizer(options),
    processor,
    renderer: defaultRenderer(options),
    responder: defaultResponder(200, 'Success')
  }

}
