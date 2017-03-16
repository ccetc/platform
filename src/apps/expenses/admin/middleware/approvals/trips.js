import { resources } from 'platform/middleware/rest'
import Trip from '../../../models/trip'
import TripSerializer from '../../../serializers/trip_serializer'
import canApprove from './utils'

const loggers = require('./loggers').default('trip')
const notification = require('./notification').default('trip')
const processors = require('./processors').default('trip', Trip)

export default resources({
  access: canApprove,
  actions: {
    approve: {
      logger: loggers.approve,
      method: 'patch',
      notification: notification.approve,
      on: 'member',
      path: 'approve',
      processor: processors.approve
    },
    reject: {
      logger: loggers.reject,
      method: 'patch',
      notification: notification.reject,
      on: 'member',
      path: 'reject',
      processor: processors.reject
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
