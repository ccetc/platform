import Promise from 'bluebird'
import _ from 'lodash'
import knex from 'platform/services/knex'
import { coerceArray, defaultQuery, filterParams, applyToRecords,toList } from '../utils'
import { defaultRenderer } from '../utils/defaults'
import { extractSort, filter, selectFields } from '../utils/list'

import CSVRenderer from '../renderers/csv'
import JSONRenderer from '../renderers/json'
import XLSXRenderer from '../renderers/xlsx'
import XMLRenderer from '../renderers/xml'

export default (options) => {

  const tableName = options.model.extend().__super__.tableName

  const processor = (req, resolve, reject) => {

    if(req.query.$filter) {

      const filterParams = options.filterParams || []

      const unpermitted = Object.keys(req.query.$filter).filter(key => {
        return !_.includes(filterParams, key) && key !== 'q'
      })

      if(unpermitted.length > 0) {
        return reject({ code: 422, message: `Unable to filter on the keys ${toList(unpermitted)}` })
      }

      if(req.query.$filter.q && !options.searchParams) {
        return reject({ code: 422, message: 'Unable to filter on the keys q' })
      }

    }

    const fetchOptions = options.withRelated ? { withRelated:  coerceArray(options.withRelated) } : {}

    const limit = parseInt(_.get(req.query, '$page.limit')) || 50

    const skip = parseInt(_.get(req.query, '$page.skip')) || 0

    const query = qb => {

      const filters = filterParams(req.query.$filter, options.filterParams)

      qb = defaultQuery(req, options, qb, filters)

      if(options.searchParams && req.query.$filter && req.query.$filter.q) {
        const term = `%${req.query.$filter.q.toLowerCase()}%`
        const sql = options.searchParams.map(param => `LOWER(${param}) LIKE ?`).join(' OR ')
        const vars = options.searchParams.map(param => term)
        qb.whereRaw(`(${sql})`, vars)
      }

      if(filters) {
        filter(qb, filters)
      }

      if(req.query.$exclude_ids) {
        qb.whereNotIn(`${tableName}.id`, req.query.$exclude_ids)
      }

      if(req.query.$ids) {
        qb.whereIn(`${tableName}.id`, req.query.$ids)
      }

      return qb

    }

    const all = () => options.model.query(qb => {

      if(options.ownedByUser) {
        qb = qb.where('user_id', req.user.get('id'))
      }

      if(options.softDelete) {
        qb = qb.whereNull('deleted_at')
      }

      qb.count('*')

    }).fetchAll()


    const queryObject = query(knex(tableName)).toSQL()

    const count = () => knex.raw(`select count(*) from (${queryObject.sql}) as temp`, queryObject.bindings)

    const paged = () => options.model.query(qb => {

      const sort = extractSort(req.query.$sort, options.defaultSort, options.sortParams)

      qb = query(qb)

      if(req.query.$page) {

        qb.limit(limit).offset(skip)

      }

      if(sort) {
        sort.map(item => {
          qb.orderBy(item.key, item.order)
        })
      }

    }).fetchAll(fetchOptions)

    return Promise.all([all(), count(), paged()]).then(responses => {

      const all = parseInt(responses[0].toJSON()[0].count)

      const total = responses[1].rows[0].count ? parseInt(responses[1].rows[0].count) : 0

      const records = responses[2]

      resolve({ all, total, records, limit, skip })

    }).catch(err => {

      if(err.errors) return reject({ code: 422, message: `Unable to create ${options.name}`, errors: err.toJSON() })

      reject({ code: 500, message: err.message })

    })

  }

  const renderer = (req, result) => {

    const renderer = defaultRenderer(options)

    const selecter = selectFields(req.query.$select)

    return applyToRecords(req, result, [renderer, selecter])

  }

  const responder = (req, res, next, result) => {

    if(req.params.ext === 'csv') {
      return CSVRenderer(result.all, result.total, result.limit, result.skip, result.records, ',', options, req, res, next)
    } else if(req.params.ext === 'tsv') {
      return CSVRenderer(result.all, result.total, result.limit, result.skip, result.records, '\t', options, req, res, next)
    } else if(req.params.ext === 'xlsx') {
      return XLSXRenderer(result.all, result.total, result.limit, result.skip, result.records, options, req, res, next)
    } else if(req.params.ext === 'xml') {
      return XMLRenderer(result.all, result.total, result.limit, result.skip, result.records, options, req, res, next)
    } else if(req.params.ext === 'json' || req.params.ext === undefined) {
      return JSONRenderer(result.all, result.total, result.limit, result.skip, result.records, options, req, res, next)
    } else {
      return Promise((resolve, reject) => {
        reject({ code: 415, message: 'We dont currently support this media type' })
      })
    }

  }

  return {
    processor,
    renderer,
    responder
  }

}
