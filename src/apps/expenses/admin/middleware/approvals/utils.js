import Member from '../../../models/member'

export const canApprove = (req) => {

  return Member.where('user_id', req.user.get('id')).fetchAll({ withRelated: ['member_type'] }).then(members => {

    return members.reduce((allowed, member) => {
      return !allowed ? (member.get('member_type_id') != 3) : true
    }, false)

  })

}
