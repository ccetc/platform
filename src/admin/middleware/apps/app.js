import { fail } from 'platform/utils/responses'
import App from 'platform/models/app'

export default (title) => {

  return (req, res, next) => {

    return App.where({ title }).fetch().then(app => {

      req.app = app

      next()

      return null

    }).catch(err => {
      fail(res, 422, 'Unable to load app' )
    })

  }

}
