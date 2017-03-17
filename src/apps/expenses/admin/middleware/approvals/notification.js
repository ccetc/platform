import pluralize from 'pluralize'

export default (type, action) => {

  return (req, result, resolve, reject) => {

    resolve({
      user_ids: result.get('user_id'),
      subject_id: result.get('approved_by_id'),
      text: `${action} {object1} in {object2}`,
      url: `/admin/expenses/${pluralize(type)}/${result.get('id')}`,
      object1_description: `your ${type}`,
      object1_text: result.get('description'),
      object2_description: 'the project',
      object2_text: result.related('project').get('title')
    })

  }

}
