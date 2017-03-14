import Promise from 'bluebird'
import route from 'platform/middleware/route'

const processor = (req) => {

  return new Promise((resolve, reject) => {

    const data = {
      photo_id: req.body.photo_id
    }

    return req.user.save(data, { patch: true }).then(() => {

      resolve(data)

    }).catch(err => {

      reject({ code: 422, message: 'Unable to update photo', errors: err.toJSON() })

    })

  })

}

const logger = (result) => ({
  text: 'changed their photo'
})

export default route({
  logger,
  method: 'patch',
  path: '/api/admin/account/photo',
  processor
})
