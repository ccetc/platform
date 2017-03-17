export const createMemberActivity = (req, result, resolve, reject) => {

  return result.load(['user','project']).then(() => {

    resolve({
      text: 'added {object1} to {object2}',
      object1_type: 'member',
      object1_text: result.related('user').get('full_name'),
      object2_type: 'project',
      object2_text: result.related('project').get('title')
    })

  }).catch(err => {

    reject({ code: 422, message: 'unable to log activity' })

  })

}

export const toggleExpenseTypeActivity = (req, result, resolve, reject) => {

  resolve({
    text: `${result.action} {object1} in {object2}`,
    object1_type: 'expense type',
    object1_text: result.expense_type.get('title'),
    object2_type: 'project',
    object2_text: result.project.get('title')
  })

}
