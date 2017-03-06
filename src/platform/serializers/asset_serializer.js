export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    original_file_name: object.get('original_file_name'),
    file_name: object.get('file_name'),
    content_type: object.get('content_type'),
    file_size: object.get('file_size'),
    chunks_total: object.get('chunks_total'),
    thumbnail_url: object.related('receipt').get('thumbnail_url'),
    resized_url: object.related('receipt').get('resized_url'),
    url: object.related('receipt').get('url'),
    created_at: object.get('created_at'),
    updated_at: object.get('updated_at')
  })

}
