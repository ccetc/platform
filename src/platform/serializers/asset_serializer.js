export default (object) => {

  return Promise.resolve({
    id: object.get('id'),
    original_file_name: object.get('original_file_name'),
    file_name: object.get('file_name'),
    content_type: object.get('content_type'),
    file_size: object.get('file_size'),
    chunks_total: object.get('chunks_total'),
    created_at: object.get('created_at'),
    updated_at: object.get('updated_at')
  })

}
