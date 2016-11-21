const serializer = (object) => ({
  id: object.get('id'),
  file_name: object.get('file_name'),
  content_type: object.get('content_type'),
  file_size: object.get('file_size'),
  url: object.get('url'),
  created_at: object.get('created_at'),
  updated_at: object('updated_at')
})

export default serializer
