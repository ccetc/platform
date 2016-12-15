import { Router } from 'express'
import User from 'platform/models/user'

const session = Router()

session.get('/session', (req, res, next) => {
  User.where({ id: req.user.id }).fetch({ withRelated: ['photo'] }).then(user => {
    res.json({
      apps: [
        { name: 'Reimbursement', icon: 'dollar', items: [
          { name: 'Advances', route: '/admin/reimbursement/advances' },
          { name: 'Expense Types', route: '/admin/reimbursement/expense_types' },
          { name: 'Expenses', route: '/admin/reimbursement/expenses' },
          { name: 'Projects', route: '/admin/reimbursement/projects' },
          { name: 'Trips', route: '/admin/reimbursement/trips' },
          { name: 'Vendors', route: '/admin/reimbursement/vendors' },
          { name: 'Reports', route: '/admin/reimbursement/reports' }
        ] },
        { name: 'Team', icon: 'setting', items: [
          { name: 'Activities', route: '/admin/activities' },
          { name: 'Apps', route: '/admin/apps' },
          { name: 'Emails', route: '/admin/emails' },
          { name: 'Settings', route: '/admin/settings' },
          { name: 'Users', route: '/admin/users' }
        ] }
      ],
      user: {
        name: user.get('full_name'),
        email: user.get('email'),
        photo: user.related('photo').get('url'),
        unread: Math.floor((Math.random() * 20) + 1),
        permissions: [
          'can access contacts',
          'can access expenses',
          'can access team'
        ]
      }
    })
  })
})

export default session
