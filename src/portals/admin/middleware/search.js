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
      console.log(result)
      json[key] = result
    })
    return res.status(200).json(json)
  }).catch(err => {
    return res.status(500).json(err)
  })
}

const session = Router()
session.get('/search', search)

export default session
