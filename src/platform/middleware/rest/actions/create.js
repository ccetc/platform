import { filterParams } from '../utils'
import { defaultLogger } from '../utils/defaults'

export default (options) => {

  const processor = (req, resolve, reject) => {

    const params = {
      ...req.body,
      ...req.params
    }

    const data = {
      ...options.defaultParams ? options.defaultParams(req) : {},
      ...options.ownedByTeam ? { team_id: req.team.get('id') } : {},
      ...options.ownedByUser ? { user_id: req.user.get('id') } : {},
      ...filterParams(params, options.allowedParams)
    }

    return options.model.forge(data).save().then(resource => {

      resolve(resource)

    }).catch(err => {

      if(err.errors) return reject({ code: 422, message: `Unable to create ${options.name}`, errors: err.toJSON() })

      reject({ code: 500, message: err.message })

    })

  }

  const activity = (req, result, resolve, reject) => {
    console.log('here')
    const activity = result.get('activity')

    if(!activity) resolve({})

    resolve({
      text: 'created {object1}',
      object1_type: activity.type,
      object1_text: activity.text
    })

  }

  const logger = options.activity ? defaultLogger({ activity: options.activity }) : defaultLogger({ activity })

  return {
    processor,
    logger
  }

}
