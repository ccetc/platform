import { route } from 'platform/middleware/rest'
import jwt from 'platform/services/jwt'
import User from 'platform/models/user'

const processor = (req, resolve, reject) => {
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
    return reject({ code: 422, message: 'Unable to complete request', errors: err.toJSON() })
  })
}

export default route({
  authenticated: false,
  method: 'post',
  path: '/signin/password',
  processor,
  rules: {
    team_id: 'required',
    email: 'required',
    password: 'required'
  }
})
