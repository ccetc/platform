import { succeed, fail } from 'platform/utils/responses'

export default (req, res) => {

  if(!req.user.authenticate(req.body.old_password)) {
    return fail(res, 422, 'Unable to update account', { errors: { old_password: ['invalid' ]} })
  }

  if(req.body.new_password != req.body.confirm_password) {
    return fail(res, 422, 'Unable to update account', { errors: { confirm_password: ['passwords do not match'] } })
  }

  req.user.save({ password: req.body.new_password }, { patch: true }).then(() => {

    succeed(res, 200)

  }).catch(err => {

    fail(res, 422, 'Unable to update account', { errors: err.toJSON() })

  })


}
