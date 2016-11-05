const serializer = (object) => ({
  id: object.get('id'),
  first_name: object.get('first_name'),
  last_name: object.get('last_name'),
  email: object.get('email')
})

export default serializer
