import ContactQuery from '../queries/contact_query'
import Contact from '../models/contact'

export default (query) => {
  return new Promise((resolve, reject) => {
    ContactQuery(Contact, query).fetchAll().then(results => {
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
