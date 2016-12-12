import Promise from 'bluebird'
import { Router } from 'express'
import pluralize from 'pluralize'
import Error from 'server/utils/error'
import _ from 'lodash'

export default (options = {}) => {

  const service = (options) => {

    let fetchOptions = {}
    if(options.include) {
      fetchOptions.withRelated = options.include
    }

    const find = (req, res, next) => {

      const limit = parseInt(req.query['$limit']) || 50
      const skip = parseInt(req.query['$skip']) || 0
      const sort = req.query['$sort'] || _.get(options, 'find.query.$sort') || null

      const filters = {
        ...req.query,
        ...req.params
      }

      const count = options.model.query(qb => {

        qb.where({ team_id: req.team.get('id') })

        if(options.query) {
          qb = options.query(qb, filters)
        }

        if(req.query['$exclude_ids']) {
          qb.whereNotIn('id', req.query['$exclude_ids'])
        }

        qb.count('*')

      }).fetchAll()

      const paged = options.model.query(qb => {

        qb.where({ team_id: req.team.get('id') })

        if(options.query) {
          qb = options.query(qb, filters)
        }

        if(req.query['$exclude_ids']) {
          qb.whereNotIn('id', req.query['$exclude_ids'])
        }

        if(limit > 0) {
          qb.limit(limit)
        }

        if(skip > 0) {
          qb.offset(skip)
        }

        if(sort) {
          const sortKey = sort.replace('-', '')
          const sortOrder = (sort[0] == '-') ? 'desc' : 'asc'
          qb.orderBy(sortKey, sortOrder)
        }

      }).fetchAll(fetchOptions)

      Promise.all([count,paged]).then(response => {
        const total = parseInt(response[0].toJSON()[0].count)

        const data = response[1].map(record => {
          record = (options.serializer) ? options.serializer(record) : record
          return (req.query['$select']) ? _.pick(record, ['id', ...req.query['$select']]) : record
        })

        res.json({ total, limit, skip, data })

      }).catch(err => {
        const error = new Error({ code: 500, message: err.message })
        return next(error)
      })

    }

    const get = (req, res, next) => {

      options.model.where({ id: req.params.id }).fetch(fetchOptions).then(record => {

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

    const create = (req, res, next) => {

      const params = {
        team_id: req.team.get('id'),
        ...req.body
      }

      options.model.forge(params).save().then(record => {

        if(!record) {
          const error = new Error({ code: 422, message: 'There were problems with your data' })
          next(error)
        }

        return res.status(201).json(record)

      }).catch(err => {
        const error = new Error({ code: 422, message: 'There were problems with your data', errors: err })
        next(error)
      })

    }

    const update = (req, res, next) => {

      options.model.where({ id: req.params.id }).fetch().then(record => {

        if(!record) {
          const error = new Error({ code: 404, message: 'unable to load record'})
          next(error)
        }

        return record.save(req.body).then(record => {

          res.status(201).json(record)

        }).catch(err => {
          const error = new Error({ code: 500, message: 'application error', errors: err })
          next(error)
        })


      }).catch(err => {
        const error = new Error({ code: 500, message: 'application error', errors: err })
        next(error)
      })

    }

    const patch = (req, res, next) => {

      options.model.where({ id: req.params.id }).fetch().then(record => {

        if(!record) {
          const error = new Error({ code: 404, message: 'unable to load record'})
          next(error)
        }

        return record.save(req.body, { patch: true }).then(record => {

          res.status(201).json(record)

        }).catch(err => {
          const error = new Error({ code: 500, message: 'application error', errors: err })
          next(error)
        })


      }).catch(err => {
        const error = new Error({ code: 500, message: 'application error', errors: err })
        next(error)
      })

    }

    const remove = (req, res, next) => {

      options.model.where({ id: req.params.id }).fetch().then(record => {

        if(!record) {
          const error = new Error({ code: 404, message: 'unable to load record'})
          next(error)
        }

        return record.destroy().then(record => {

          res.status(201).json({})

        }).catch(err => {
          const error = new Error({ code: 500, message: 'application error', errors: err })
          next(error)
        })

      }).catch(err => {
        const error = new Error({ code: 500, message: 'application error', errors: err })
        next(error)
      })

    }

    if(!options.path) {
      options.path = pluralize(options.name)
    }

    const path = (options.prefix) ? `${options.prefix}/${options.path}` : options.path

    const router = Router()
    router.get(`/${path}`, find)
    router.post(`/${path}`, create)
    router.get(`/${path}/:id`, get)
    router.put(`/${path}/:id`, update)
    router.patch(`/${path}/:id`, patch)
    router.delete(`/${path}/:id`, remove)

    return router

  }

  const router = service(options)

  if(options.resources) {

    options.resources.map(resource => {

      resource.prefix = (resource.on === 'collection') ? options.path : `${options.path}/:${options.name}_id`
      const subrouter = service(resource)
      router.use(subrouter)

    })

  }

  return router

}
