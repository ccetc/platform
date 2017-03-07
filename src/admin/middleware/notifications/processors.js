import Notification from 'platform/models/notification'

export const readProcessor = req => {

  if(!req.body.ids) return {}

  return Notification.query().whereIn('id', req.body.ids).update({ is_read: true }).then(result => ({})).catch(err => {

    if(err.errors) throw({ code: 422, message: 'Unable to read notifications', errors: err.toJSON() })

    throw(err)

  })

}
