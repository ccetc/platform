import { resources } from 'platform/middleware/rest'
import Trip from '../../../models/trip'
import TripSerializer from '../../../serializers/trip_serializer'
import notification from './notification'
import before from './before'
import activity from './activity'
import processors from './processors'

export default resources({
  actions: {
    approve: {
      activity: activity('trip', 'submitted'),
      method: 'patch',
      notification: notification('trip', 'submitted'),
      on: 'member',
      path: 'submit',
      processor: processors('trip', Trip)
    }
  },
  activity: {
    create: activity('trip', 'created'),
    update: activity('trip', 'updated')
  },
  allowedParams: ['project_id', 'date', 'description', 'time_leaving', 'time_arriving', 'odometer_start', 'odometer_end', 'total_miles','approved_by_id','approved_at','is_approved','reason_rejected'],
  before,
  defaultParams: (req) => ({
    mileage_rate: req.apps.expenses.mileage_rate,
    amount: req.body.total_miles * req.apps.expenses.mileage_rate
  }),
  filterParams: ['project_id','date','is_approved'],
  model: Trip,
  name: 'trip',
  notification: {
    create: notification('trip', 'created'),
    update: notification('trip', 'updated')
  },
  ownedByUser: true,
  rights: ['expenses.manage_expenses'],
  serializer: TripSerializer,
  withRelated: ['user','project','approved_by']
})
