import { resources } from 'platform/middleware/rest'
import Advance from '../../../models/advance'
import AdvanceSerializer from '../../../serializers/advance_serializer'
import notification from './notification'
import before from './before'
import activity from './activity'

export default resources({
  activity: {
    create: activity('advance', 'created'),
    update: activity('advance', 'updated')
  },
  allowedParams: ['project_id','expense_type_id','vendor_id','delivery_method','date_needed','description','amount','description','approved_by_id','approved_at','is_approved','is_submitted','reason_rejected'],
  before,
  filterParams: ['expense_type_id','project_id','date_needed','is_approved'],
  model: Advance,
  name: 'advance',
  notification: {
    create: notification('advance', 'created'),
    update: notification('advance', 'updated')
  },
  ownedByUser: true,
  path: 'advances',
  rights: ['expenses.manage_expenses'],
  serializer: AdvanceSerializer,
  withRelated: ['user','project','expense_type','approved_by','vendor']
})
