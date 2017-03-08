import { succeed } from 'platform/utils/responses'

export default (req, res) => {

  const data = {
    first_name: req.user.get('first_name'),
    last_name: req.user.get('last_name'),
    email: req.user.get('email'),
    photo_id: req.user.get('photo_id')
  }

  succeed(res, 200, '', { data })

}
