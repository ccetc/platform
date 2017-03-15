import { resources } from 'platform/middleware/rest'
import Advance from '../../../models/advance'
import AdvanceSerializer from '../../../serializers/advance_serializer'
import after from './after'
import before from './before'
import logger from './logger'

export default resources({
  after: {
    create: after('advance', 'created'),
    update: after('advance', 'updated')
  },
  allowedParams: ['project_id','expense_type_id','vendor_id','delivery_method','date_needed','description','amount','description','approved_by_id','approved_at','is_approved','is_submitted','reason_rejected'],
  before,
  filterParams: ['expense_type_id','project_id','date_needed','is_approved'],
  logger: {
    create: logger('advance', 'created'),
    update: logger('advance', 'updated')
  },
  model: Advance,
  name: 'advance',
  ownedByUser: true,
  path: 'advances',
  rights: ['expenses.manage_expenses'],
  serializer: AdvanceSerializer,
  withRelated: ['user','project','expense_type','approved_by','vendor']
})
