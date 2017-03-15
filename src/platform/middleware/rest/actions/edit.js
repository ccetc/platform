import { defaultAuthenticator, defaultAuthorizer, defaultResponder } from '../utils/defaults'
import load from '../helpers/load'

export default options => {

  const processor = (req, resolve, reject) => load(options)(req).then(resolve)

  const responder = defaultResponder(200, 'success')

  return {
    authenticator: defaultAuthenticator(options),
    authorizer: defaultAuthorizer(options),
    processor,
    responder
  }

}
