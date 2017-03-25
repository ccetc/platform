export default (object) => {

  return Promise.resolve({
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
    subject: {
      id: object.related('subject').get('id'),
      full_name: object.related('subject').get('full_name'),
      photo: object.related('subject').related('photo').get('path')
    },
    user: {
      id: object.related('user').get('id'),
      full_name: object.related('user').get('full_name'),
      initials: object.related('user').get('initials'),
      photo: object.related('user').related('photo').get('path')
    },
    object1: object.get('object1_text') ? {
      description: object.get('object1_description'),
      text: object.get('object1_text')
    } : null,
    object2: object.get('object2_text') ? {
      description: object.get('object2_description'),
      text: object.get('object2_text')
    } : null,
    created_at: object.get('created_at'),
    updated_at: object.get('updated_at')
  })

}
