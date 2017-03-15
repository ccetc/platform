import Notification from 'platform/models/notification'

export const readProcessor = (req, resolve, reject) => {

  if(!req.body.ids) return resolve({})

  return Notification.query().whereIn('id', req.body.ids).update({ is_read: true }).then(result => {

    resolve({})

  }).catch(err => {

    if(err.errors) reject({ code: 422, message: 'Unable to read notifications', errors: err.toJSON() })

    reject({ code: 500, message: err.message })

  })

}
