import resources from 'platform/middleware/resources'
import Member from '../../../models/member'

export default resources({
  model: Member,
  name: 'membership',
  only: 'list',
  query: (qb, req, filters) => {
    qb.innerJoin('expenses_projects', 'expenses_projects.id', 'expenses_members.project_id')
    qb.where('expenses_members.user_id', req.user.get('id'))
    qb.where('expenses_members.is_active', true)
  },
  serializer: (member) => {
    return Promise.resolve({
      id: member.related('project').get('id'),
      title: member.related('project').get('title'),
      code: member.related('project').get('code'),
      member_type: member.related('member_type').get('name').toLowerCase()
    })
  },
  withRelated: ['project','member_type']
})
