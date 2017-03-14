import Promise from 'bluebird'
import route from 'platform/middleware/route'

const processor = (req) => {

  return new Promise((resolve, reject) => {

    if(!req.user.authenticate(req.body.old_password)) {
      return reject({ code: 422, message: 'Unable to update account', errors: { old_password: ['invalid' ]} })
    }

    if(req.body.new_password != req.body.confirm_password) {
      return reject({ code: 422, message: 'Unable to update account', errors: { confirm_password: ['passwords do not match' ]} })
    }

    req.user.save({ password: req.body.new_password }, { patch: true }).then(() => {

      resolve()

    }).catch(err => {

      return reject({ code: 422, message: 'Unable to update account', errors: err.toJSON() })

    })

  })

}

const logger = (result) => ({
  text: 'updated their password'
})

export default route({
  logger,
  method: 'patch',
  path: '/api/admin/account/password',
  processor
})
