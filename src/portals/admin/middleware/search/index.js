import Promise from 'bluebird'
import { Router } from 'express'
import path from 'path'
import glob from 'glob'

export const search = (req, res, next) => {

  const files = glob.sync(path.resolve(__dirname, '../../../../**/searches/*_search.js'))

  let searches = {}
  files.map(filepath => {
    const matches = filepath.match(/([a-z]*)_search\.js/)
    if(matches) {
      const search = require(filepath).default
      searches[matches[1]] = search(req.query)
    }
  })

  const promises = Object.keys(searches).map(key => searches[key])
  Promise.all(promises).then(results => {
    let json = {}
    results.map((result, index) => {
      const key = Object.keys(searches)[index]
      if(result.length > 0) {
        json[key] = result
      }
    })
    return res.status(200).json(json)
  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })

}

const router = Router()
router.get('/search', search)
export default router
