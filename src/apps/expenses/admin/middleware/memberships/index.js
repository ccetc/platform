import resources from 'platform/middleware/resources'
import Project from '../../../models/project'
import ProjectSerializer from '../../../serializers/project_serializer'

export default resources({
  allowedParams: ['title','code'],
  model: Project,
  name: 'membership',
  only: 'list',
  query: (qb, req, filters) => {
    qb.joinRaw('inner join expenses_members on (expenses_members.project_id = expenses_projects.id and expenses_members.user_id=? AND expenses_members.is_active=?)', [req.user.get('id'), true])
    qb.where('expenses_projects.is_active', true)
  },
  serializer: ProjectSerializer
})
