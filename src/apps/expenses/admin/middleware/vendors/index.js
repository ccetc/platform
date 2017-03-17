import { resources } from 'platform/middleware/rest'
import Vendor from '../../../models/vendor'

export default resources({
  activity: false,
  allowedParams: ['name'],
  model: Vendor,
  name: 'vendor',
  path: 'vendors',
  query: (qb, req, filters) => {
    qb.orderByRaw('lower(name) asc')
  },
  searchParams: ['name']
})
