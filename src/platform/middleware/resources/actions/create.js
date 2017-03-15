import { mergeParams, filterParams, resourceRenderer, resourceResponder, resourceLogger } from '../utils'

export default options => {

  const processor = (req, resolve, reject) => {

    const defaults = options.defaultParams ? options.defaultParams(req) : {}

    const allowedParams = mergeParams(options.allowedParams.all, options.allowedParams.create)

    const data = {
      ...defaults,
      ...options.ownedByTeam ? { team_id: req.team.get('id') } : {},
      ...options.ownedByUser ? { user_id: req.user.get('id') } : {},
      ...filterParams(req.body, allowedParams)
    }

    return options.model.forge(data).save().then(resource => {

      resolve(resource)

    }).catch(err => {

      if(err.errors) return reject({ code: 422, message: `Unable to create ${options.name}`, errors: err.toJSON() })

      reject({ code: 500, message: err.message })

    })

  }

  const serializer = options.serializer.create || options.serializer.all

  const renderer = resourceRenderer(serializer, options)

  const responder = resourceResponder(200, `Sucessfully created ${options.name}`)

  const log = options.log.create || options.log.all

  const logger = (log !== false) ? resourceLogger('created {object1}') : null

  return { processor, renderer, responder, logger }

}
