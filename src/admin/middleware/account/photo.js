import { succeed, fail } from 'platform/utils/responses'

export default (req, res) => {

  const data = {
    photo_id: req.body.photo_id
  }

  req.user.save(data, { patch: true }).then(() => {

    succeed(res, 200, { data })

  }).catch(err => {

    fail(res, 422, 'Unable to update account', { errors: err.toJSON() })

  })


}
