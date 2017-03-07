import Member from '../../../models/member'

export const canApprove = (req) => {

  return Member.query(qb => {

    qb.joinRaw('inner join expenses_projects on expenses_projects.id=expenses_members.project_id and expenses_projects.is_active=?', true)
    qb.where('expenses_members.user_id', req.user.get('id'))
    qb.where('expenses_members.is_active', true)

  }).fetchAll({ withRelated: ['member_type'] }).then(members => {

    return members.reduce((allowed, member) => {
      return !allowed ? (member.get('member_type_id') != 3) : true
    }, false)

  })

}
