import { resources } from 'platform/middleware/rest'
import Trip from '../../../models/trip'
import TripSerializer from '../../../serializers/trip_serializer'
import canApprove from './utils'
import activity from './activity'
import notification from './notification'
import processors from './processors'

export default resources({
  access: canApprove,
  actions: {
    approve: {
      activity: activity('trip', 'approved'),
      method: 'patch',
      notification: notification('trip', 'approved'),
      on: 'member',
      path: 'approve',
      processor: processors('trip', Trip, 'approve', true)
    },
    reject: {
      activity: activity('trip', 'rejected'),
      method: 'patch',
      notification: notification('trip', 'rejected'),
      on: 'member',
      path: 'reject',
      processor: processors('trip', Trip, 'reject', false)
    }
  },
  defaultSort: '-date_needed',
  filterParams: ['user_id','expense_type_id','project_id','date_needed','is_approved'],
  model: Trip,
  name: 'trip',
  only: ['list','show','update'],
  ownedByUser: false,
  pathPrefix: '/approvals',
  query: (qb, req, filters) => {
    qb.joinRaw('inner join expenses_members on expenses_members.project_id = expenses_trips.project_id and expenses_members.user_id=? and expenses_members.member_type_id != ?', [req.user.get('id'), 3])
    qb.whereNot('expenses_trips.user_id', req.user.get('id'))
    qb.where(function() {
      this.where('expenses_trips.is_submitted', true).orWhere('expenses_trips.is_approved', false)
    })
  },
  serializer: TripSerializer,
  sortParams: ['date'],
  withRelated: ['user.photo','project']
})
