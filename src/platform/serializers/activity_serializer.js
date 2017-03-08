export default (object) => {

  return {
    id: object.get('id'),
    url: object.get('url'),
    is_read: object.get('is_read'),
    app: {
      id: object.related('app').get('id'),
      title: object.related('app').get('title'),
      icon: object.related('app').get('icon')
    },
    story: {
      text: object.related('story').get('text')
    },
    user: {
      id: object.related('user').get('id'),
      full_name: object.related('user').get('full_name'),
      photo: object.related('user').related('photo').get('thumbnail_url')
    },
    object1: object.get('object1_text') ? {
      type: object.get('object1_type'),
      text: object.get('object1_text')
    } : null,
    object2: object.get('object2_text') ? {
      type: object.get('object2_type'),
      text: object.get('object2_text')
    } : null,
    created_at: object.get('created_at'),
    updated_at: object.get('updated_at')
  }

}
