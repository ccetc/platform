import { resources } from 'platform/middleware/rest'
import Advance from '../../../models/advance'
import AdvanceSerializer from '../../../serializers/advance_serializer'
import canApprove from './utils'
import activity from './activity'
import notification from './notification'
import processors from './processors'

export default resources({
  access: canApprove,
  actions: {
    approve: {
      activity: activity('advance', 'approved'),
      method: 'patch',
      notification: notification('advance', 'approved'),
      on: 'member',
      path: 'approve',
      processor: processors('advance', Advance, 'approve', true)
    },
    reject: {
      activity: activity('advance', 'rejected'),
      method: 'patch',
      notification: notification('advance', 'rejected'),
      on: 'member',
      path: 'reject',
      processor: processors('advance', Advance, 'reject', false)
    }
  },
  defaultSort: '-date_needed',
  filterParams: ['user_id','expense_type_id','project_id','date_needed','is_approved'],
  model: Advance,
  name: 'advance',
  only: ['list','show','update'],
  ownedByUser: false,
  pathPrefix: '/approvals',
  query: (qb, req, filters) => {
    qb.joinRaw('inner join expenses_members on expenses_members.project_id = expenses_advances.project_id and expenses_members.user_id=? and expenses_members.member_type_id != ?', [req.user.get('id'), 3])
    qb.whereNot('expenses_advances.user_id', req.user.get('id'))
    qb.where(function() {
      this.where('expenses_advances.is_submitted', true).orWhere('expenses_advances.is_approved', false)
    })
  },
  serializer: AdvanceSerializer,
  sortParams: ['date'],
  withRelated: ['user.photo','project','expense_type','vendor']
})
