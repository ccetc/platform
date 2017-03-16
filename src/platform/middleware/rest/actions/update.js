import { filterParams } from '../utils'
import { defaultLogger } from '../utils/defaults'
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

  const logger = options.activity ? defaultLogger({ activity: options.activity }) : defaultLogger({

    activity: (req, result, resolve, reject) => {

      const activity = result.get('activity')

      if(!activity) resolve({})

      resolve({
        text: 'updated {object1}',
        object1_type: activity.type,
        object1_text: activity.text
      })

    }

  })

  return {
    processor,
    logger
  }

}
