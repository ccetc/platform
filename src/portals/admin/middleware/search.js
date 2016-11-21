import { Router } from 'express'
import ContactQuery from 'apps/crm/queries/contact_query'
import Contact from 'apps/crm/models/contact'

export const search = (req, res, next) => {
  let queries = []
  queries.push(ContactQuery(Contact, req.query).fetchAll())
  Promise.all(queries).then(results => {
    let json = {}
    results.map((result) => {
      json['contacts'] = result.map(contact => ({
        id: contact.get('id'),
        name: contact.get('full_name'),
        email: contact.get('email'),
        route: `/admin/crm/contacts/${contact.get('id')}`
      }))
    })
    return res.status(200).json(json)
  }).catch(err => {
    return res.status(500).json(err)
  })
}

const session = Router()
session.get('/search', search)

export default session
