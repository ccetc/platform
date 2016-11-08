import jwt from '../../utils/jwt'

const one_day = 60 * 60 * 24

let controller = {}

controller.claim = (req, res) => {

  jwt.with_token(req, res, req.query.token, one_day, 'activation_user_id', 'activated_at', (req, res, user) => {

    const activation_token = jwt.encode({ reset_user_id: user.id })
    return res.json({ activation_token }).status(200)

  })

}

controller.security = (req, res) => {

  const token = jwt.extract_token_from_header(req, res)
  if(!token) return null

  jwt.with_token(req, res, token, one_day, 'activation_user_id', 'activated_at', (req, res, user) => {

    if(!req.body.security_question_1_answer && req.body.security_question_2_answer) {
      return res.json({ message: 'you must provide the answer to at least 1 security question' }).status(401)
    }

    return res.json({}).status(200)

  })

}

controller.password = (req, res) => {

  const token = jwt.extract_token_from_header(req, res)
  if(!token) return null

  jwt.with_token(req, res, token, one_day, 'activation_user_id', 'activated_at', (req, res, user) => {

    if(!req.body.new_password && req.body.confirm_password) {
      return res.json({ message: 'you must provide and confirm a new password' }).status(422)
    }

    if(req.body.new_password !== user.confirm_password) {
      return res.json({ message: 'passwords do not match' }).status(422)
    }

    return user.save({ password: req.body.new_password }).then(user => {

      const auth_token = jwt.encode({ user_id: user.id })
      return res.json({ auth_token }).status(200)

    }).catch(err => {

      return res.json({ message: 'There were problems with your data', errors: err.toJSON() }).status(422)

    })

  })

}

export default controller
