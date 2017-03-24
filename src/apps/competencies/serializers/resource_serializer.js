export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    title: object.get('title'),
    description: object.get('description'),
    url: object.get('url'),
    created_at: object.get('created_at'),
    updated_at: object.get('updated_at')
  })

}
