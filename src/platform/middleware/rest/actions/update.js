import { mergeParams, filterParams } from '../utils'
import { defaultAuthenticator, defaultAuthorizer, defaultLogger, defaultRenderer, defaultResponder } from '../utils/defaults'
import load from '../helpers/load'

export default options => {

  const processor = (req, resolve, reject) => {

    return load(options)(req).then(resource => {

      const params = {
        ...req.body,
        ...req.params
      }

      const data = filterParams(params, options.allowedParams)

      return resource.save(data, { patch: true }).then(resolve)

    }).catch(err => {

      if(err.errors) return reject({ code: 422, message: `Unable to create ${options.name}`, errors: err.toJSON() })

      reject({ code: 500, message: err.message })

    })

  }

  const logger = (result) => {

    const activity = result.get('activity')

    if(!activity) return {}

    return {
      text: 'updated {object1}',
      object1_type: activity.type,
      object1_text: activity.text
    }

  }

  return {
    authenticator: defaultAuthenticator(options),
    authorizer: defaultAuthorizer(options),
    processor,
    logger: (options.log !== false) ? defaultLogger({ logger }) : null,
    renderer: defaultRenderer(options),
    responder: defaultResponder(201, 'success')
  }

}
