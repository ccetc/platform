export default (type, action) => {

  return (req, result, resolve, reject) => {

    return result.load(['project']).then(() => {

      const verb = (result.get('is_submitted')) ? 'submitted' : action

      resolve({
        text: `${verb} {object1} in {object2}`,
        object1_type: type,
        object1_text: result.get('description'),
        object2_type: 'project',
        object2_text: result.related('project').get('title')
      })

    }).catch(err => {

      reject({ code: 422, message: 'unable to log activity' })

    })

  }

}
