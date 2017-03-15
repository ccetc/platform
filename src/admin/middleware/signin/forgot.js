import route from 'platform/middleware/route'
import Checkit from 'checkit'
import jwt from 'platform/services/jwt'
import User from 'platform/models/user'

export default route({
  authenticated: false,
  method: 'post',
  path: '/signin/forgot',
  processor: (req, resolve, reject) => {

    Checkit({
      team_id: 'required',
      email: 'required'
    }).run(req.query).then(fields => {

      return User.where({ email: req.body.email }).fetch().then(user => {

        if(!user) {
          return reject({ code: 404, message: 'Unable to find this user'})
        }

        const one_day = 60 * 60 * 24
        const token = jwt.encode({ reset_user_id: user.id }, one_day)

        // queue.createJob('send_reset_email', {
        //   from: 'notifier@cms.cce.cornell.edu',
        //   to: [req.body.email],
        //   subject: 'Your password reset',
        //   body: `Here is your password: <a href="${req.protocol}://${req.headers.host}/admin/reset/${token}">Reset Password</a>`
        // }).save()

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
