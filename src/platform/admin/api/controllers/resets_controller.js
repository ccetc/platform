import jwt from 'utils/jwt'
import models from 'platform/models'
import { queue } from 'services/queue'

const one_hour = 60 * 60

let controller = {}

controller.create = (req, res) => {

  if(!req.body.email) {
    return res.status(422).json({ message: 'email required' })
  }

  models.user.where({ email: req.body.email }).fetch().then(user => {

    if(!user) {
      return res.status(422).json({ message: 'cannot find user' })
    }

    const token = jwt.encode({ reset_user_id: user.id })

    queue.createJob('send_reset_email', {
      from: 'notifier@cms.cce.cornell.edu',
      to: [req.body.email],
      subject: 'Your password reset',
      body: `Here is your password: <a href="/admin/reset/${token}">Reset Password</a>`
    }).save()

    return res.status(200).json({})

  })

}

controller.claim = (req, res) => {

  jwt.with_token(req, res, req.params.token, one_hour, 'reset_user_id', 'reset_at', (req, res) => {

    const reset_token = jwt.encode({ reset_user_id: req.user.get('id') })
    return res.status(200).json({ reset_token, security_question_1_id: req.user.get('security_question_1_id'), security_question_2_id: req.user.get('security_question_2_id') })

  })

}

controller.security = (req, res) => {

  const token = jwt.extract_token_from_header(req, res)
  if(!token) return null

  jwt.with_token(req, res, token, one_hour, 'reset_user_id', 'reset_at', (req, res) => {

    if(!req.body.security_question_1_answer && !req.body.security_question_2_answer) {
      return res.status(422).json({ message: 'you must provide the answer to at least 1 security question' })
    }

    if(req.body.security_question_1_answer && req.body.security_question_1_answer !== req.user.get('security_question_1_answer')) {
      return res.status(422).json({ message: 'your answer does not match the one we have on file' })
    }

    if(req.body.security_question_2_answer && req.body.security_question_2_answer !== req.user.get('security_question_2_answer')) {
      return res.status(422).json({ message: 'your answer does not match the one we have on file' })
    }

    return res.status(200).json({})

  })

}

controller.password = (req, res) => {

  const token = jwt.extract_token_from_header(req, res)
  if(!token) return null

  jwt.with_token(req, res, token, one_hour, 'reset_user_id', 'reset_at', (req, res) => {

    if(!req.body.new_password || !req.body.confirm_password) {
      return res.status(401).json({ message: 'you must provide and confirm a new password' })
    }

    if(req.body.new_password !== req.body.confirm_password) {
      return res.status(401).json({ message: 'passwords do not match' })
    }

    return req.user.save({ password: req.body.new_password, reset_at: new Date() }).then(user => {

      const auth_token = jwt.encode({ user_id: user.id })
      return res.status(200).json({ auth_token })

    }).catch(err => {

      return res.status(422).json({ message: 'There were problems with your data', errors: err.toJSON() })

    })

  })

}

export default controller
