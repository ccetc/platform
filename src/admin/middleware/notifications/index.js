import resources from 'platform/middleware/resources'
import Notification from 'platform/models/notification'
import NotificationSerializer from 'platform/serializers/notification_serializer'
import { readProcessor } from './processors'

export default resources({
  actions: {
    read: {
      on: 'collection',
      path: 'read',
      method: 'patch'
    }
  },
  defaultSort: '-created_at',
  model: Notification,
  name: 'notification',
  only: 'list',
  ownedByUser: true,
  processor: {
    read: readProcessor
  },
  serializer: NotificationSerializer,
  sortParams: ['created_at'],
  withRelated: ['app','story','subject.photo','user.photo']
})
