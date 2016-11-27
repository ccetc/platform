import Promise from 'bluebird'
import ContactQuery from '../queries/contact_query'
import Contact from '../models/contact'

export default filters => {
  return new Promise((resolve, reject) => {
    Contact.query(qb => {
      qb = ContactQuery(qb, filters)
    }).fetchAll().then(results => {
      const json = results.map(result => ({
        id: result.get('id'),
        name: result.get('full_name'),
        email: result.get('email'),
        route: `/admin/crm/contacts/${result.get('id')}`
      }))
      resolve(json)
    }).catch(err => {
      reject(err)
    })
  })
}
