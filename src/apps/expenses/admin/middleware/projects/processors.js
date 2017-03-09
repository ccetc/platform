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

  return ExpenseTypeProject.where(data).fetch({ withRelated: ['expense_type','project']}).then(expense_type_project => {

    if(expense_type_project) {
      const result = {
        expense_type: expense_type_project.related('expense_type'),
        project: expense_type_project.related('project'),
        action: 'enabled'
      }
      return ExpenseTypeProject.where(data).fetch().then(item => {
        return item.destroy().then(() => result)
      })
    }

    return ExpenseTypeProject.forge(data).save().then(expense_type_project => {

      return expense_type_project.load(['expense_type','project']).then(() => ({
        expense_type: expense_type_project.related('expense_type'),
        project: expense_type_project.related('project'),
        action: 'disabled'
      }))

    })

  })

}
