import { Router } from 'express'
import Error from 'utils/error'
import _ from 'lodash'

export default (model) => {

  const find = (req, res, next) => {

    const limit = parseInt(req.query['$limit']) || 50
    const skip = parseInt(req.query['$skip']) || 0

    const count = model.query(qb => {

      if(req.query['$exclude_ids']) {
        qb.whereNotIn('id', req.query['$exclude_ids'])
      }

      qb.count('*')

    }).fetchAll()

    const paged = model.query(qb => {

      if(req.query['$exclude_ids']) {
        qb.whereNotIn('id', req.query['$exclude_ids'])
      }

      if(limit > 0) {
        qb.limit(limit)
      }

      if(skip > 0) {
        qb.offset(skip)
      }

    }).fetchAll()

    Promise.all([count,paged]).then(response => {

      const total = parseInt(response[0].toJSON()[0].count)

      let data = response[1]
      if(req.query['$select']) {
        data = data.map(record => {
          return _.pick(record, ['id', ...req.query['$select']])
        })
      }

      res.json({ total, limit, skip, data })

    }).catch(err => {
      next(err)
    })

  }

  const get = (req, res, next) => {

    model.where({ id: req.params.id }).fetch().then(record => {

      if(!record) {
        const error = new Error({ code: 404, message: 'unable to load record' })
        next(error)
      }

      res.status(200).json(record)

    }).catch(err => {
      next(err)
    })

  }

  const create = (req, res, next) => {

    model.forge(req.body).save().then(record => {

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

    model.where({ id: req.params.id }).fetch().then(record => {

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

    model.where({ id: req.params.id }).fetch().then(record => {

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

    model.where({ id: req.params.id }).fetch().then(record => {

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

  const service = Router()
  service.get('/', find)
  service.post('/', create)
  service.get('/:id', get)
  service.put('/:id', update)
  service.patch('/:id', patch)
  service.delete('/:id', remove)

  return service

}
