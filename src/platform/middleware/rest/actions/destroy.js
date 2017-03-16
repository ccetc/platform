import Promise from 'bluebird'
import { defaultLogger } from '../utils/defaults'
import load from '../helpers/load'

export default options => {

  const destroyRelated = resource => {

    return Promise.each(options.dependents, (dependent, index, length) => {

      return dependent.model.where({ [dependent.foreignKey]: resource.get('id') }).fetchAll().then(results => {

        const records = results.map(result => result)

        return Promise.each(records, (record, index, length) => {

          return (dependent.strategy === 'destroy') ? record.destroy() : record.save({ [dependent.foreignKey]: null }, { patch: true })

        })

      })

    })

  }

  const destroyResource = resource => {

    return options.softDelete ? resource.save({ deleted_at: new Date() }, { patch: true }) : resource.destroy()

  }

  const processor = (req, resolve, reject) => {

    load('destroy', options)(req).then(resource => {

      return destroyRelated(resource).then(() => resource)

    }).then(resource => {

      return destroyResource(resource)

    }).then(() => {

      resolve()

    }).catch(err => {

      if(err.errors) return reject({ code: 422, message: `Unable to delete ${options.name}`, errors: err.toJSON() })

      reject({ code: 500, message: err.message })

    })

  }

  const logger = options.activity ? defaultLogger({ activity: options.activity }) : defaultLogger({

    activity: (req, result, resolve, reject) => {

      const activity = result.get('activity')

      if(!activity) resolve({})

      resolve({
        text: 'deleted {object1}',
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
