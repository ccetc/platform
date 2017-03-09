import Member from '../../../models/member'
import ExpenseType from '../../../models/expense_type'
import ExpenseTypeProject from '../../../models/expense_type_project'

export const createProcessor = req => {

  return Member.where({ project_id: req.params.project_id, user_id: req.body.user_id }).fetch().then(member => {

    if(member) return member

    const data = {
      team_id: req.team.get('id'),
      project_id: req.params.project_id,
      user_id: req.body.user_id,
      member_type_id: req.body.member_type_id,
      is_active: true
    }

    return Member.forge(data).save().catch(err => {

      if(err.errors) throw({ code: 422, message: 'Unable to create member', errors: err.toJSON() })

      throw(err)

    })

  })

}

export const toggleExpenseTypeProcessor = req => {

  const data = { project_id: req.params.project_id, expense_type_id: req.params.id }

  return ExpenseTypeProject.where(data).fetch().then(expense_type_project => {

    if(expense_type_project) {
      return ExpenseTypeProject.where(data).fetch().then(item => {
        return item.destroy().then(() => expense_type_project)
      })
    }

    return ExpenseTypeProject.forge(data).save()

  })

}
