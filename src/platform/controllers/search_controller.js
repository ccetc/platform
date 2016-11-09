import models from '../../apps/crm/models'
let controller = {}

controller.index = (req, res) => {
  models.contact.query(qb => { qb.whereRaw('LOWER(first_name) LIKE ?', [`%${req.query.q}%`]) }).fetchAll().then(contacts => {
    if(contacts.length) {
      const records = contacts.map(contact => {
        return {
          name: contact.get('full_name'),
          email: contact.get('email'),
          photo: '/images/ken.jpg',
          route: '/admin/crm/contacts/1'
        }
      })
      return res.status(200).json({ contacts: records })
    }
  })
}

export default controller
