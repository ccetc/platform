import jwt from 'utils/jwt'
import models from 'platform/models'
import serializers from 'platform/admin/api/serializers'

export default {

  create: (req, res) => {

    if(req.header('Authorization')) {

      const token = jwt.extract_token_from_header(req, res)
      if(!token) return null

      const two_weeks = 60 * 60 * 24 * 7 * 2
      jwt.with_token(req, res, token, two_weeks, 'user_id', 'logged_out_at', (req, res) => {

        const session = serializers.session(req.user)
        return res.status(200).json(session)

      })

    } else if(req.body.email && req.body.password) {

      models.user.where({ email: req.body.email }).fetch().then(user => {

        if(!user) {
          return res.status(422).json({ message: 'cannot find user' })
        }

        if(!user.authenticate(req.body.password)) {
          return res.status(422).json({ message: 'invalid password' })
        }

        const session = serializers.session(user)
        return res.status(200).json(session)

      })

    } else {

      return res.status(422).json({ message: 'email and password required' })

    }
  }

}
