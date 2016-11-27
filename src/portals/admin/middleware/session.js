import { Router } from 'express'
import User from 'platform/models/user'

const session = Router()

session.get('/session', (req, res, next) => {
  User.where({ id: req.user.id }).fetch({ withRelated: ['photo'] }).then(user => {
    res.json({
      apps: [
        { name: 'Contacts', icon: 'users', items: [
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
      user: {
        name: user.get('full_name'),
        email: user.get('email'),
        photo: user.related('photo').get('url'),
        permissions: [
          'can access contacts',
          'can access expenses',
          'can access instance'
        ]
      }
    })
  })
})

export default session
