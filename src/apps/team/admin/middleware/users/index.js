import moment from 'moment'
import knex from 'platform/services/knex'
import resources from 'platform/middleware/resources'
import User from 'platform/models/user'
import UserSerializer from 'platform/serializers/user_serializer'
import { createRoles, updateRoles } from './hooks'
import accessHandler from '../access/user.js'

export default resources({
  actions: {
    access: {
      on: 'member',
      path: 'access',
      method: 'get',
      handler: accessHandler
    }
  },
  after: {
    create: createRoles,
    update: updateRoles
  },
  allowedParams: ['first_name','last_name','email','is_active','photo_id'],
  filterParams: ['role_id','is_active'],
  defaultParams: (req) => Promise.resolve({
    is_active: true
  }),
  defaultSort: 'last_name',
  model: User,
  name: 'user',
  query: (qb, req, filters) => {
    qb.select(knex.raw('distinct on ("users"."id","users"."last_name") "users".*'))
    qb.leftJoin('users_roles', 'users_roles.user_id', 'users.id')
    if(req.query.$filter && req.query.$filter.last_online_at) {
      if(req.query.$filter.last_online_at.$eq === 'now') {
        qb.where('last_online_at', '>', moment().subtract(5, 'minutes'))
      } else if(req.query.$filter.last_online_at.$eq === 'today') {
        qb.where('last_online_at', '>', moment().startOf('day'))
      } else if(req.query.$filter.last_online_at.$eq === 'yesterday') {
        qb.where('last_online_at', '>', moment().subtract(1, 'day').startOf('day'))
      } else if(req.query.$filter.last_online_at.$eq === 'this_week') {
        qb.where('last_online_at', '>', moment().startOf('week'))
      } else if(req.query.$filter.last_online_at.$eq === 'null') {
        qb.whereNull('last_online_at')
      }
    }
  },
  serializer: UserSerializer,
  searchParams: ['first_name','last_name','email'],
  sortParams: ['last_name'],
  withRelated: ['photo','roles']
})
