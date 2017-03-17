import Promise from 'bluebird'
import Notification from 'platform/models/notification'
import NotificationSerializer from 'platform/serializers/notification_serializer'
import Story from 'platform/models/story'
import emitter from 'platform/services/io'
import { coerceArray } from '../utils'

export default (req, notificationData) => {

  return new Promise((resolve, reject) => {

    if(!notificationData) resolve()

    const storyData = { text: notificationData.text }

    return Story.where(storyData).fetch().then(story => {

      return (!story) ? Story.forge(storyData).save() : story

    }).then(story => {

      return Promise.map(coerceArray(notificationData.user_ids), (user_id) => {

        return Notification.forge({
          team_id: req.team.get('id'),
          app_id: req.app.get('id'),
          story_id: story.get('id'),
          url: notificationData.url,
          subject_id: notificationData.subject_id,
          object1_description: notificationData.object1_description,
          object1_text: notificationData.object1_text,
          object2_description: notificationData.object2_description,
          object2_text: notificationData.object2_text,
          is_read: false,
          user_id
        }).save().then(notification => {

          return notification.load(['app','story','subject','user'])

        }).then(notification => {

          return notification.related('user').save({ unread: notification.related('user').get('unread') + 1 }, { path: true }).then(user => ({ user, notification }))

        }).then(result => {

          return NotificationSerializer(result.notification).then(notification => ({ user: result.user, notification }))

        }).then(result => {

          emitter.in(`/admin/users/${result.user.id}/notifications`).emit('notification', { unread: result.user.get('unread'), notification: result.notification })

        })

      }).then(() => {

        resolve()

      })

    }).catch(err => {

      console.log(err)

      reject({ code: 422, message: 'Unable to send notifications' })

    })

  })

}
