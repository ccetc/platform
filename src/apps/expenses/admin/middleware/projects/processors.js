import Member from '../../../models/member'
import ExpenseTypeProject from '../../../models/expense_type_project'

export const createProcessor = (req, resolve, reject) => {

  return Member.where({ project_id: req.params.project_id, user_id: req.body.user_id }).fetch().then(member => {

    if(member) return member

    const data = {
      team_id: req.team.get('id'),
      project_id: req.params.project_id,
      user_id: req.body.user_id,
      member_type_id: req.body.member_type_id,
      is_active: true
    }

    return Member.forge(data).save().then(member => {

      resolve(member)

    }).catch(err => {

      if(err.errors) return reject({ code: 422, message: 'Unable to create member', errors: err.toJSON() })

      reject({ code: 500, message: err.message })

    })

  })

}

export const toggleExpenseTypeProcessor = (req, resolve, reject) => {

  const data = { project_id: req.params.project_id, expense_type_id: req.params.id }

  ExpenseTypeProject.where(data).fetch({ withRelated: ['expense_type','project']}).then(expense_type_project => {

    if(expense_type_project) {

      const result = {
        expense_type: expense_type_project.related('expense_type'),
        project: expense_type_project.related('project'),
        action: 'enabled'
      }

      ExpenseTypeProject.where(data).fetch().then(item => {

        return item.destroy()

      }).then(() => {

        resolve(result)

      })

    } else {

      ExpenseTypeProject.forge(data).save().then(expense_type_project => {

        return expense_type_project.load(['expense_type','project'])

      }).then(expense_type_project => {

        resolve({
          expense_type: expense_type_project.related('expense_type'),
          project: expense_type_project.related('project'),
          action: 'disabled'
        })

      })


    }



  })

}
