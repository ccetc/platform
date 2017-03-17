import { filterParams } from '../utils'
import { defaultActivity } from '../utils/defaults'
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

  const activity = defaultActivity(options, 'updated')

  return {
    processor,
    activity
  }

}
