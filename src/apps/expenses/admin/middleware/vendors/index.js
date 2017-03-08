import resources from 'platform/middleware/resources'
import Vendor from '../../../models/vendor'

export default resources({
  allowedParams: ['name'],
  log: false,
  model: Vendor,
  name: 'vendor',
  path: 'vendors',
  query: (qb, req, filters) => {
    qb.orderByRaw('lower(name) asc')
  }
})
