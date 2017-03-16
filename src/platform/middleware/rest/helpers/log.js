import Activity from 'platform/models/activity'
import Story from 'platform/models/story'

export default (req, activity) => {

  const storyData = { text: activity.text }

  return Story.where(storyData).fetch().then(story => {

    return (!story) ? Story.forge(storyData).save() : story

  }).then(story => {

    const activityData = {
      team_id: req.team.get('id'),
      user_id: req.user.get('id'),
      app_id: req.app.get('id'),
      story_id: story.get('id'),
      object1_type: activity.object1_type,
      object1_text: activity.object1_text,
      object2_type: activity.object2_type,
      object2_text: activity.object2_text
    }

    return Activity.forge(activityData).save()

  })

}
