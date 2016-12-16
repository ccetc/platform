import { Router } from 'express'
import User from 'platform/models/user'

const session = Router()

const menus = {}
menus['reimbursement'] = {
  name: 'Reimbursement', icon: 'dollar', items: [
    { name: 'Advances', route: '/admin/reimbursement/advances' },
    { name: 'Expense Types', route: '/admin/reimbursement/expense_types' },
    { name: 'Expenses', route: '/admin/reimbursement/expenses' },
    { name: 'Projects', route: '/admin/reimbursement/projects' },
    { name: 'Trips', route: '/admin/reimbursement/trips' },
    { name: 'Vendors', route: '/admin/reimbursement/vendors' },
    { name: 'Reports', route: '/admin/reimbursement/reports' }
  ]
}
menus['team'] = {
  name: 'Team', icon: 'setting', items: [
    { name: 'Activities', route: '/admin/activities' },
    { name: 'Apps', route: '/admin/apps' },
    { name: 'Emails', route: '/admin/emails' },
    { name: 'Settings', route: '/admin/settings' },
    { name: 'Users', route: '/admin/users' }
  ]
}

session.get('/session', (req, res, next) => {
  User.where({ id: req.user.id }).fetch({ withRelated: ['photo', 'rights', 'apps'] }).then(user => {
    res.json({
      apps: user.related('apps').map(app => menus[app.get('title').toLowerCase()]),
      user: {
        name: user.get('full_name'),
        email: user.get('email'),
        photo: user.related('photo').get('url'),
        unread: Math.floor((Math.random() * 20) + 1),
        rights: user.related('rights').map(right => right.get('text'))
      }
    })
  })
})

export default session
