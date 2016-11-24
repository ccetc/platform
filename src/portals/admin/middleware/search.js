import { Router } from 'express'
import ContactSearch from 'apps/crm/searches/contact_search'
import UserSearch from 'platform/searches/user_search'

export const search = (req, res, next) => {
  let searches = {}
  searches['contacts'] = ContactSearch(req.query)
  searches['users'] = UserSearch(req.query)
  Promise.all(Object.values(searches)).then(results => {
    let json = {}
    results.map((result, index) => {
      const key = Object.keys(searches)[index]
      json[key] = result
    })
    return res.status(200).json(json)
  }).catch(err => {
    const error = new Error({ code: 500, message: err.message })
    return next(error)
  })
}

const session = Router()
session.get('/search', search)

export default session
