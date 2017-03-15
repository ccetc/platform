import { route } from 'platform/middleware/rest'
import Checkit from 'checkit'
import User from 'platform/models/user'

export default route({
  authenticated: false,
  method: 'get',
  path: '/signin/email',
  processor: (req, resolve, reject) => {
    Checkit({
      team_id: 'required',
      email: 'required'
    }).run(req.query).then(fields => {

      User.where({ team_id: req.query.team_id, email: req.query.email }).fetch({ withRelated: ['photo'] }).then(user => {

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
          photo: user.related('photo').get('url')
        }

        resolve(data)

      }).catch(err => {
        return reject({ code: 422, message: 'Unable to complete request', data: err.toJSON() })
      })

    }).catch(err => {
      return reject({ code: 422, message: 'Unable to complete request', data: err.toJSON() })
    })
  }
})
