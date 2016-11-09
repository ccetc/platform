import jwt from '../../utils/jwt'

export default (req, res, next) => {

  const token = jwt.extract_token_from_header(req, res)
  if(!token) return null

  const two_weeks = 60 * 60 * 24 * 7 * 2
  jwt.with_token(req, res, token, two_weeks, 'user_id', 'logged_out_at', (req, res, user) => {

    if(req.path === '/refresh') {
      const token = jwt.encode({ user_id: user.id })
      return res.status(200).json({ token })
    }

    next()

    return null

  })

}
