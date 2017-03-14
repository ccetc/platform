import route from 'platform/middleware/route'

const processor = (req) => {

  const data = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  }

  return req.user.save(data, { patch: true }).then(() => data).catch(err => {

    throw { code: 422, message: 'Unable to update account', errors: err.toJSON() }

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
