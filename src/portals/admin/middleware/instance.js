import { Router } from 'express'
import Instance from 'platform/models/instance'

const instance = Router()

instance.get('/instance', (req, res, next) => {
  return Instance.where({ id: 1 }).fetch().then(instance => {
    return res.status(200).json({
      id: instance.get('id'),
      title: instance.get('title'),
      subtitle: instance.get('subtitle'),
      logo: '/images/cornell.png'
      // logo: instance.related('logo').get('url')
    })
  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })
})

export default instance
