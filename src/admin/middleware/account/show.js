import Promise from 'bluebird'
import route from 'platform/middleware/route'

export default route({
  method: 'get',
  path: '/account',
  processor: (req) => {
    return Promise.resolve({
      first_name: req.user.get('first_name'),
      last_name: req.user.get('last_name'),
      email: req.user.get('email'),
      photo_id: req.user.get('photo_id')
    })
  }
})
