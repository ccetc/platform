import Member from '../../../models/member'
import pluralize from 'pluralize'

export default (type, action) => {

  return (req, result, resolve, reject) => {

    result.load(['project']).then(() => {

      Member.query(qb => {

        qb.where('project_id', result.get('project_id'))
        qb.whereIn('member_type_id', [1, 2])
        qb.whereNot('user_id', req.user.get('id'))

      }).fetchAll().then(members => {

        resolve({
          user_ids: members.map(member => member.get('user_id')),
          subject_id: result.get('user_id'),
          text: 'submitted {object1} in {object2} for approval',
          url: `/admin/expenses/approvals/${pluralize(type)}/${result.get('id')}`,
          object1_description: `the ${type}`,
          object1_text: result.get('description'),
          object2_description: 'the project',
          object2_text: result.related('project').get('title')
        })

      })

    })

  }

}
