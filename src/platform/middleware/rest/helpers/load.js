import { coerceArray, defaultQuery } from './utils'

export default (action, options) => {

  const withRelated = options.withRelated || []

  const fetchOptions = withRelated ? { withRelated: coerceArray(withRelated) } : {}

  const tableName = options.model.extend().__super__.tableName

  const primaryKey = options.primaryKey || 'id'

  return req => {

    return options.model.query(qb => {

      qb = defaultQuery(req, options, action, qb, {})

      qb.where(`${tableName}.id`, req.params[primaryKey])

    }).fetch(fetchOptions).then(record => {

      if(!record) {
        throw({ code: 404, message: `Unable to find ${options.name}` })
      }

      return record

    })

  }

}
