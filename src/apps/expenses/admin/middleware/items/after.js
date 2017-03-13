import Member from '../../../models/member'
import Story from 'platform/models/story'
import Notification from 'platform/models/notification'
import pluralize from 'pluralize'

export default (type, action) => {

  return (req, resource) => {

    if(!resource.get('is_submitted')) {
      return null
    }

    const text = 'submitted {object1} in {object2} for approval'

    return Story.where({ text }).fetch().then(story => {

      return (!story) ? Story.forge({ text }).save() : story

    }).then(story => {

      return resource.load(['project']).then(() => {

        return Member.query(qb => {

          qb.where('project_id', resource.get('project_id'))
          qb.whereIn('member_type_id', [1, 2])
          qb.whereNot('user_id', req.user.get('id'))

        }).fetchAll().then(members => {

          const promises = members.map(member => {

            const data = {
              team_id: req.team.get('id'),
              story_id: story.get('id'),
              user_id: member.get('user_id'),
              app_id: 2,
              subject_id: resource.get('user_id'),
              url: `/admin/expenses/approvals/${pluralize(type)}/${resource.get('id')}`,
              object1_description: `the ${type}`,
              object1_text: resource.get('description'),
              object2_description: 'the project',
              object2_text: resource.related('project').get('title'),
              is_read: false
            }

            return Notification.forge(data).save()

          })

          return Promise.all(promises)

        })

      })

    })

  }

}
