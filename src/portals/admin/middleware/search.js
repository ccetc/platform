import Promise from 'bluebird'
import { Router } from 'express'
import ProjectSearch from 'apps/expenses/searches/project_search'
import UserSearch from 'platform/searches/user_search'

export const search = (req, res, next) => {
  let searches = {}
  searches['projects'] = ProjectSearch(req.query)
  searches['users'] = UserSearch(req.query)
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

export const create = (req, res, next) => {

}

const session = Router()
session.get('/search', search)

export default session
