import crm from '../../apps/crm'

let controller = {}

controller.index = (req, res) => {
  let queries = []
  queries.push(crm.queries.contacts(crm.models.contact, req.query).fetchAll())
  Promise.all(queries).then(results => {
    let json = {}
    results.map((result) => {
      json['contacts'] = result.map(contact => ({
        id: contact.get('id'),
        name: contact.get('full_name'),
        email: contact.get('email'),
        photo: '/images/ken.jpg',
        route: '/admin/crm/contacts/1'
      }))
    })
    return res.status(200).json(json)
  })
}

export default controller
