import { mergeParams, filterParams, resourceRenderer, resourceResponder, resourceLogger } from '../utils'
import load from '../helpers/load'

export default options => {

  const processor = (req, resolve, reject) => {

    return load('update', options)(req).then(resource => {

      const allowedParams = mergeParams(options.allowedParams.all, options.allowedParams.update)

      const data = filterParams(req.body, allowedParams)

      return resource.save(data, { patch: true }).then(resolve)

    }).catch(err => {

      if(err.errors) return reject({ code: 422, message: `Unable to create ${options.name}`, errors: err.toJSON() })

      reject({ code: 500, message: err.message })

    })

  }

  const renderer = resourceRenderer(options)

  const responder = resourceResponder(201, `Sucessfully updated ${options.name}`)

  const logger = (options.log !== false) ? resourceLogger('created {object1}') : null

  return { processor, renderer, responder, logger }

}
