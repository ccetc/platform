import Promise from 'bluebird'
import { Router } from 'express'
import Error from 'server/utils/error'
import _ from 'lodash'

export default (options = {}) => {

  const service = (options) => {

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

    if(!options.path) {
      options.path = options.name
    }

    const path = (options.prefix) ? `${options.prefix}/${options.path}` : options.path

    const router = Router()
    router.get(`/${path}`, get)
    router.put(`/${path}`, update)
    router.patch(`/${path}`, patch)
    router.delete(`/${path}`, remove)

    return router

  }

  const router = service(options)

  return router

}
