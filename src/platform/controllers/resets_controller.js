import jwt from '../../utils/jwt'
import models from '../../platform/models'
import { queue } from '../../services/queue'

const one_hour = 60 * 60

let controller = {}

controller.create = (req, res) => {

  if(!req.body.email) {
    return res.json({ message: 'email required' }).status(422)
  }

  models.user.where({ email: req.body.email }).fetch().then(user => {

    if(!user) {
      return res.json({ message: 'cannot find user' }).status(422)
    }

    const token = jwt.encode({ reset_user_id: user.id })

    queue.createJob('send_reset_email', {
      from: 'notifier@cms.cce.cornell.edu',
      to: [req.body.email],
      subject: 'Your password reset',
      body: `Here is your password: <a href="/admin/reset/${token}">Reset Password</a>`
    }).save()

    return res.json({}).status(200)

  })

}

controller.claim = (req, res) => {

  jwt.with_token(req, res, req.params.token, one_hour, 'reset_user_id', 'reset_at', (req, res, user) => {

    const reset_token = jwt.encode({ reset_user_id: user.id })
    return res.json({ reset_token, security_question_1_id: user.get('security_question_1_id'), security_question_2_id: user.get('security_question_2_id') }).status(200)

  })

}

controller.security = (req, res) => {

  const token = jwt.extract_token_from_header(req, res)
  if(!token) return null

  jwt.with_token(req, res, token, one_hour, 'reset_user_id', 'reset_at', (req, res, user) => {

    if(!req.body.security_question_1_answer && !req.body.security_question_2_answer) {
      return res.json({ message: 'you must provide the answer to at least 1 security question' }).status(422)
    }

    if(req.body.security_question_1_answer && req.body.security_question_1_answer !== user.get('security_question_1_answer')) {
      return res.json({ message: 'your answer does not match the one we have on file' }).status(422)
    }

    if(req.body.security_question_2_answer && req.body.security_question_2_answer !== user.get('security_question_2_answer')) {
      return res.json({ message: 'your answer does not match the one we have on file' }).status(422)
    }

    return res.json({}).status(200)

  })

}

controller.password = (req, res) => {

  const token = jwt.extract_token_from_header(req, res)
  if(!token) return null

  jwt.with_token(req, res, token, one_hour, 'reset_user_id', 'reset_at', (req, res, user) => {

    if(!req.body.new_password || !req.body.confirm_password) {
      return res.json({ message: 'you must provide and confirm a new password' }).status(401)
    }

    if(req.body.new_password !== req.body.confirm_password) {
      return res.json({ message: 'passwords do not match' }).status(401)
    }

    return user.save({ password: req.body.new_password, reset_at: new Date() }).then(user => {

      const auth_token = jwt.encode({ user_id: user.id })
      return res.json({ auth_token }).status(200)

    }).catch(err => {
      return res.json({ message: 'There were problems with your data', errors: err.toJSON() }).status(422)
    })

  })

}

export default controller
