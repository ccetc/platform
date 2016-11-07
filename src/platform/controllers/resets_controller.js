import jwt from 'jwt-simple'
import config from '../../../config/platform'
import models from '../../platform/models'
import { queue } from '../../services/queue'
import send_reset_email_job from '../jobs/send_reset_email_job'

let controller = {}

controller.create = (req, res) => {

  if(!req.body.email) {
    return res.json({ message: 'email required' }).status(422)
  }

  models.user.where({ email: req.body.email }).fetch().then(user => {

    if(!user) {
      return res.json({ message: 'cannot find user' }).status(422)
    }

    const secret = config[process.env.NODE_ENV].secret
    const timestamp = Math.round(new Date() / 1000)
    const encoded = jwt.encode({ timestamp, user_id: user.id }, secret)

    queue.createJob('send_reset_email', {
      from: 'notifier@cms.cce.cornell.edu',
      to: [req.body.email],
      subject: 'Your password reset',
      body: `Here is your password: <a href="/admin/reset/${encoded}">Reset Password</a>`
    }).save()

    return res.json({}).status(200)

  })

}

export default controller
