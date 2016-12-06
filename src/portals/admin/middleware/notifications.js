import { Router } from 'express'
import resources from 'server/middleware/resources'
import Notification from 'platform/models/notification'
import NotificationSerializer from 'platform/serializers/notification_serializer'

const notifications = Router()

notifications.use(resources({
  name: 'notification',
  path: 'notifications',
  model: Notification,
  serializer: NotificationSerializer,
  include: ['story','user.photo']
}))

export default notifications
