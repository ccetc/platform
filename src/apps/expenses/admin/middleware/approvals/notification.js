import pluralize from 'pluralize'

export default (type) => {

  const notification = (type) => {

    return (req, result, resolve, reject) => {
      resolve({
        user_ids: req.user.get('id'),
        subject_id: result.get('approved_by_id'),
        url: `/admin/expenses/${pluralize(type)}/${result.get('id')}`,
        object1_description: `your ${type}`,
        object1_text: result.get('description'),
        object2_description: 'the project',
        object2_text: result.related('project').get('title')
      })
    }

  }

  return {
    approve: notification('approved'),
    reject: notification('rejected')
  }

}
