export default (object) => ({
  id: object.get('id'),
  title: object.get('title'),
  author: object.get('author'),
  version: object.get('version'),
  short_description: object.get('short_description'),
  long_description: object.get('long_description'),
  icon: object.get('icon'),
  category: object.get('category'),
  installed: object.get('team_id') !== null
})
