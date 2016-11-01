const serializer = (object) => ({
  id: object.id,
  file_name: object.file_name,
  content_type: object.content_type,
  file_size: object.file_size,
  url: object.url,
  created_at: object.created_at,
  updated_at: object.updated_at
})

export default serializer
