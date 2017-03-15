import { resources } from 'platform/middleware/rest'
import Notification from 'platform/models/notification'
import NotificationSerializer from 'platform/serializers/notification_serializer'
import { readProcessor } from './processors'

export default resources({
  actions: {
    read: {
      on: 'collection',
      path: 'read',
      method: 'patch',
      processor: readProcessor
    }
  },
  defaultSort: '-created_at',
  model: Notification,
  name: 'notification',
  only: 'list',
  ownedByUser: true,
  serializer: NotificationSerializer,
  sortParams: ['created_at'],
  withRelated: ['app','story','subject.photo','user.photo']
})
