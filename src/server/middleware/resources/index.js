import Promise from 'bluebird'
import { Router } from 'express'
import Error from 'server/utils/error'
import _ from 'lodash'

export default (options = {}) => {

  let fetchOptions = {}
  if(options.include) {
    fetchOptions.withRelated = options.include
  }

  const find = (req, res, next) => {

    const limit = parseInt(req.query['$limit']) || 50
    const skip = parseInt(req.query['$skip']) || 0
    const sort = req.query['$sort'] || null

    const count = options.model.query(qb => {

      if(req.query['$exclude_ids']) {
        qb.whereNotIn('id', req.query['$exclude_ids'])
      }

      qb.count('*')

    }).fetchAll()

    const paged = options.model.query(qb => {

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

    options.model.forge(req.body).save().then(record => {

      if(!record) {
        const error = new Error({ code: 422, message: 'There were problems with your data' })
        next(error)
      }

      return res.status(201).json(record)

    }).catch(err => {
      const error = new Error({ code: 422, message: 'There were problems with your data', errors: err.toJSON() })
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
        const error = new Error({ code: 500, message: 'application error', errors: err.toJSON() })
        next(error)
      })


    }).catch(err => {
      const error = new Error({ code: 500, message: 'application error', errors: err.toJSON() })
      next(error)
    })

  }

  const patch = (req, res, next) => {

    options.model.where({ id: req.params.id }).fetch().then(record => {

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

    options.model.where({ id: req.params.id }).fetch().then(record => {

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

  const resources = Router()
  resources.get(`${options.path}`, find)
  resources.post(`${options.path}`, create)
  resources.get(`${options.path}/:id`, get)
  resources.put(`${options.path}/:id`, update)
  resources.patch(`${options.path}/:id`, patch)
  resources.delete(`${options.path}/:id`, remove)

  return resources

}
