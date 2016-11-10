import jwt from '../../utils/jwt'

const one_day = 60 * 60 * 24

let controller = {}

controller.claim = (req, res) => {

  jwt.with_token(req, res, req.query.token, one_day, 'activation_user_id', 'activated_at', (req, res) => {

    const activation_token = jwt.encode({ reset_user_id: req.user.get('id') })
    return res.status(200).json({ activation_token })

  })

}

controller.security = (req, res) => {

  const token = jwt.extract_token_from_header(req, res)
  if(!token) return null

  jwt.with_token(req, res, token, one_day, 'activation_user_id', 'activated_at', (req, res) => {

    if(!req.body.security_question_1_answer && req.body.security_question_2_answer) {
      return res.status(401).json({ message: 'you must provide the answer to at least 1 security question' })
    }

    return res.status(200).json({})

  })

}

controller.password = (req, res) => {

  const token = jwt.extract_token_from_header(req, res)
  if(!token) return null

  jwt.with_token(req, res, token, one_day, 'activation_user_id', 'activated_at', (req, res) => {

    if(!req.body.new_password && req.body.confirm_password) {
      return res.status(422).json({ message: 'you must provide and confirm a new password' })
    }

    if(req.body.new_password !== req.user.confirm_password) {
      return res.status(422).json({ message: 'passwords do not match' })
    }

    return req.user.save({ password: req.body.new_password }).then(user => {

      const auth_token = jwt.encode({ user_id: user.id })
      return res.status(200).json({ auth_token })

    }).catch(err => {

      return res.status(422).json({ message: 'There were problems with your data', errors: err.toJSON() })

    })

  })

}

export default controller
