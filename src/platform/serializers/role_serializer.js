export default (object) => ({
  id: object.get('id'),
  title: object.get('title'),
  description: object.get('description'),
  created_at: object.get('created_at'),
  updated_at: object.get('updated_at')
})
