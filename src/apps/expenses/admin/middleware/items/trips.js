import resources from 'platform/middleware/resources'
import Trip from '../../../models/trip'
import TripSerializer from '../../../serializers/trip_serializer'
import after from './after'
import before from './before'
import logger from './logger'

export default resources({
  after: {
    create: after('trip', 'created'),
    update: after('trip', 'updated')
  },
  allowedParams: ['project_id', 'date', 'description', 'time_leaving', 'time_arriving', 'odometer_start', 'odometer_end', 'total_miles','approved_by_id','approved_at','is_approved','reason_rejected'],
  before,
  defaultParams: (req) => ({
    mileage_rate: req.apps.expenses.mileage_rate,
    amount: req.body.total_miles * req.apps.expenses.mileage_rate
  }),
  filterParams: ['project_id','date','is_approved'],
  logger: {
    create: logger('trip', 'created'),
    update: logger('trip', 'updated')
  },
  name: 'trip',
  model: Trip,
  ownedByUser: true,
  rights: ['expenses.manage_expenses'],
  serializer: TripSerializer,
  withRelated: ['user','project','approved_by']
})
