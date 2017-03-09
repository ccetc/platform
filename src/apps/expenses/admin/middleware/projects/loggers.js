import log from 'platform/middleware/resources/helpers/log'

export const createMemberLogger = (req, result) => {

  return result.load(['user','project']).then(() => {

    return log(req, 'added {object1} to {object2}', 'member', result.related('user').get('full_name'), 'project', result.related('project').get('title')).then(() => result)

  })

}

export const toggleExpenseTypeLogger = (req, result) => {

  return result.load(['project']).then(() => {

    return log(req, 'toggled {object1} in {object2}', 'expense type', result.get('title'), 'project', result.related('project').get('title')).then(() => result)

  })

}
