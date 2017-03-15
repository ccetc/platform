import Promise from 'bluebird'
import Checkit from 'checkit'

export default (options) => {

  return (req) => {

    if(!options.rules) return true

    return new Promise((resolve, reject) => {

      return Checkit(options.rules).run(req.body).then(() => {

        resolve()

      }).catch(err => {

        reject({ code: 422, message: 'Unable to complete request', errors: err.toJSON() })

      })

    })


  }

}
