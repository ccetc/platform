import { resources } from 'platform/middleware/rest'
import Project from '../../../models/project'

export default resources({
  model: Project,
  name: 'membership',
  only: 'list',
  query: (qb, req, filters) => {
    qb.select('expenses_projects.*', 'expenses_member_types.name as member_type')
    qb.joinRaw('inner join expenses_members on expenses_members.project_id=expenses_projects.id and expenses_members.user_id=? and expenses_members.is_active=?', [req.user.get('id'), true])
    qb.joinRaw('inner join expenses_member_types on expenses_member_types.id=expenses_members.member_type_id')
  },
  serializer: (project) => {
    return Promise.resolve({
      id: project.get('id'),
      title: project.get('title'),
      code: project.get('code'),
      member_type: project.get('member_type').toLowerCase()
    })
  },
  searchParams: ['title']
})
