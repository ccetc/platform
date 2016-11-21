import jwt from 'utils/jwt'

const serializer = (object) => ({
  apps: [
    { name: 'Contacts', icon: 'user', items: [
      { name: 'Contacts', route: '/admin/crm/contacts' }
    ] },
    { name: 'Expenses', icon: 'dollar', items: [
      { name: 'Advances', route: '/admin/expenses/advances' },
      { name: 'Expense Types', route: '/admin/expenses/expense_types' },
      { name: 'Expenses', route: '/admin/expenses/expenses' },
      { name: 'Projects', route: '/admin/expenses/projects' },
      { name: 'Trips', route: '/admin/expenses/trips' },
      { name: 'Vendors', route: '/admin/expenses/vendors' }
    ] },
    { name: 'Instance', icon: 'setting', items: [
      { name: 'Activities', route: '/admin/instance/activities' },
      { name: 'Apps', route: '/admin/instance/apps' },
      { name: 'Emails', route: '/admin/instance/emails' },
      { name: 'Settings', route: '/admin/instance/settings' },
      { name: 'Users', route: '/admin/instance/users' }
    ] }
  ],
  token: jwt.encode({ user_id: object.get('id') }),
  user: {
    name: object.get('full_name'),
    email: object.get('email'),
    photo: object.related('photo').get('url'),
    permissions: [
      'can access contacts',
      'can access expenses',
      'can access instance'
    ]
  }
})

export default serializer
