import route from 'platform/middleware/route'
import Checkit from 'checkit'
import jwt from 'platform/services/jwt'
import User from 'platform/models/user'

export default route({
  authenticated: false,
  method: 'post',
  path: '/signin/password',
  processor: (req, resolve, reject) => {
    Checkit({
      team_id: 'required',
      email: 'required',
      password: 'required'
    }).run(req.body).then(fields => {

      User.where({
        team_id: req.body.team_id,
        email: req.body.email
      }).fetch().then(user => {

        if(!user) {
          return reject({ code: 404, message: 'Unable to find this user'})
        }

        if(!user.authenticate(req.body.password)) {
          return reject({ code: 404, message: 'Invalid password'})
        }

        const two_weeks = 60 * 60 * 24 * 7 * 2
        const token = jwt.encode({ user_id: user.id }, two_weeks)
        const data = { token }

        resolve(data)

      }).catch(err => {
        return reject({ code: 422, message: 'Unable to complete request', data: err.toJSON() })
      })

    }).catch(err => {
      return reject({ code: 422, message: 'Unable to complete request', data: err.toJSON() })
    })
  }
})
