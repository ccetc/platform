import Promise from 'bluebird'
import Notification from 'platform/models/notification'
import Story from 'platform/models/story'
import { coerceArray } from '../utils'

export default (req, notification) => {

  return new Promise((resolve, reject) => {

    if(!notification) resolve()

    const storyData = { text: notification.text }

    return Story.where(storyData).fetch().then(story => {

      return (!story) ? Story.forge(storyData).save() : story

    }).then(story => {

      Promise.map(coerceArray(notification.user_ids), (user_id) => {

        return Notification.forge({
          team_id: req.team.get('id'),
          app_id: req.app.get('id'),
          story_id: story.get('id'),
          url: notification.url,
          subject_id: notification.subject_id,
          object1_description: notification.object1_description,
          object1_text: notification.object1_text,
          object2_description: notification.object2_description,
          object2_text: notification.object2_text,
          is_read: false,
          user_id
        }).save()

      }).then(() => {

        resolve()

      })

    }).catch(err => {

      console.log(err)

      reject({ code: 422, message: 'Unable to send notifications' })

    })

  })

}
