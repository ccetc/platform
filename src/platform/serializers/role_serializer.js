export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    title: object.get('title'),
    description: object.get('description'),
    users: object.related('users').map(user => ({
      id: user.get('id'),
      full_name: user.get('full_name'),
      initials: user.get('initials'),
      email: user.get('email'),
      photo: user.related('photo').get('path')
    })),
    created_at: object.get('created_at'),
    updated_at: object.get('updated_at')
  })

}
