import resources from 'platform/middleware/resources'
import Notification from 'platform/models/notification'
import NotificationSerializer from 'platform/serializers/notification_serializer'

export default resources({
  defaultSort: '-created_at',
  model: Notification,
  name: 'notification',
  only: 'list',
  serializer: NotificationSerializer,
  sortParams: ['created_at'],
  withRelated: ['app','story','subject.photo','user.photo']
})
