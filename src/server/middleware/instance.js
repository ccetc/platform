import Instance from 'platform/models/instance'

export default (req, res, next) => {
  Instance.query(qb => {
    qb.where({ id: 1 })
  }).fetch().then(instance => {

    req.instance = instance
    next()

  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })
}
