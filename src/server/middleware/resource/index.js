import { Router } from 'express'
import Error from 'server/utils/error'

export default (options = {}) => {

  let fetchOptions = {}
  if(options.include) {
    fetchOptions.withRelated = options.include
  }

  const get = (req, res, next) => {

    options.model.where({ id: req.user.id }).fetch(fetchOptions).then(record => {

      if(!record) {
        const error = new Error({ code: 404, message: 'unable to load record' })
        next(error)
      }

      record = (options.serializer) ? options.serializer(record) : record

      res.status(200).json(record)

    }).catch(err => {
      const error = new Error({ code: 500, message: err.message })
      return next(error)
    })

  }

  const update = (req, res, next) => {

    options.model.where({ id: req.user.id }).fetch().then(record => {

      if(!record) {
        const error = new Error({ code: 404, message: 'unable to load record'})
        next(error)
      }

      return record.save(req.body).then(record => {

        res.status(201).json(record)

      }).catch(err => {
        const error = new Error({ code: 500, message: 'application error', errors: err.toJSON() })
        next(error)
      })


    }).catch(err => {
      const error = new Error({ code: 500, message: 'application error', errors: err.toJSON() })
      next(error)
    })

  }

  const patch = (req, res, next) => {

    options.model.where({ id: req.user.id }).fetch().then(record => {

      if(!record) {
        const error = new Error({ code: 404, message: 'unable to load record'})
        next(error)
      }

      return record.save(req.body).then(record => {

        res.status(201).json(record)

      }).catch(err => {
        const error = new Error({ code: 500, message: 'application error', errors: err.toJSON() })
        next(error)
      })


    }).catch(err => {
      const error = new Error({ code: 500, message: 'application error', errors: err.toJSON() })
      next(error)
    })

  }

  const remove = (req, res, next) => {

    options.model.where({ id: req.user.id }).fetch().then(record => {

      if(!record) {
        const error = new Error({ code: 404, message: 'unable to load record'})
        next(error)
      }

      return record.destroy().then(record => {

        res.status(201).json({})

      }).catch(err => {
        const error = new Error({ code: 500, message: 'application error', errors: err.toJSON() })
        next(error)
      })

    }).catch(err => {
      const error = new Error({ code: 500, message: 'application error', errors: err.toJSON() })
      next(error)
    })

  }

  const resource = Router()
  resource.get(options.path, get)
  resource.put(options.path, update)
  resource.patch(options.path, patch)
  resource.delete(options.path, remove)

  return resource

}
