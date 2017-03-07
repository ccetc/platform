import Story from 'platform/models/story'
import Notification from 'platform/models/notification'
import pluralize from 'pluralize'

export default (type) => {

  const afterExpense = (action) => {

    return (req, resource) => {

      const text = `${action} {object1} in {object2}`

      return Story.where({ text }).fetch().then(story => {

        return (!story) ? Story.forge({ text }).save() : story

      }).then(story => {

        return resource.load(['project']).then(() => {

          const data = {
            team_id: req.team.get('id'),
            story_id: story.get('id'),
            user_id: resource.get('user_id'),
            app_id: 2,
            subject_id: resource.get('approved_by_id'),
            url: `/admin/expenses/${pluralize(type)}/${resource.get('id')}`,
            object1_model: `apps/expenses/models/${type}`,
            object1_id: resource.get('id'),
            object1_description: `your ${type}`,
            object1_text: resource.get('description'),
            object2_model: 'apps/expenses/models/project',
            object2_id: resource.related('project').get('id'),
            object2_description: 'the project',
            object2_text: resource.related('project').get('title'),
            is_read: false
          }

          console.log(data)

          return Notification.forge(data).save()

        })

      })

    }

  }

  return {
    approve: afterExpense('approved'),
    reject: afterExpense('rejected')
  }

}
