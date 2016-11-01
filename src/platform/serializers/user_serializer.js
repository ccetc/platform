const serializer = (object) => ({
  id: object.id,
  first_name: object.first_name,
  last_name: object.last_name,
  email: object.email
})

export default serializer
