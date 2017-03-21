import { route } from 'platform/middleware/rest'
import User from 'platform/models/user'

export const processor = (req, resolve, reject) => {

  User.where({ team_id: req.body.team_id, email: req.body.email }).fetch({ withRelated: ['photo'] }).then(user => {

    if(!user) {
      return reject({ code: 404, message: 'Unable to find this user'})
    }

    if(!user.get('is_active')) {
      return reject({ code: 403, message: 'Your account has been disabled' })
    }

    const data = {
      id: user.get('id'),
      full_name: user.get('full_name'),
      initials: user.get('initials'),
      email: user.get('email'),
      photo: user.related('photo').get('path')
    }

    resolve(data)

  }).catch(err => {
    return reject({ code: 422, message: 'Unable to complete request', errors: err.toJSON() })
  })

}

export default route({
  authenticated: false,
  method: 'post',
  path: '/signin/email',
  processor,
  rules: {
    team_id: 'required',
    email: 'required'
  }
})
