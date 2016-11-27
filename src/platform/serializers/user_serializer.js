export default (object) => ({
  id: object.get('id'),
  first_name: object.get('first_name'),
  last_name: object.get('last_name'),
  full_name: object.get('full_name'),
  email: object.get('email'),
  photo: object.related('photo').get('url'),
  created_at: object.get('created_at'),
  updated_at: object.get('updated_at')
})
