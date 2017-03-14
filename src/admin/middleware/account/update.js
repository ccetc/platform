import Promise from 'bluebird'
import route from 'platform/middleware/route'

const processor = (req) => {

  return new Promise((resolve, reject) => {

    const data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email
    }

    return req.user.save(data, { patch: true }).then(() => {

      resolve(data)

    }).catch(err => {

      reject({ code: 422, message: 'Unable to update account', errors: err.toJSON() })

    })

  })

}

const logger = (result) => ({
  text: 'updated their account'
})

export default route({
  logger,
  method: 'patch',
  path: '/api/admin/account',
  processor
})
