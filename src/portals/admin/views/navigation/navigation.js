module.exports = [
  { label: 'Reimbursement', icon: 'dollar', rights: ['MANAGE REIMBURSEMENTS'], items: [
    { label: 'Advances', rights: ['MANAGE REIMBURSEMENTS'], route: '/admin/reimbursement/advances' },
    { label: 'Expenses', rights: ['MANAGE REIMBURSEMENTS'], route: '/admin/reimbursement/expenses' },
    { label: 'Trips', rights: ['MANAGE REIMBURSEMENTS'], route: '/admin/reimbursement/trips' },
    { label: 'Admin', rights: ['ADMIN REIMBURSEMENTS'], items: [
      { label: 'Expense Types', rights: ['ADMIN REIMBURSEMENTS'], route: '/admin/reimbursement/expense_types' },
      { label: 'Projects', rights: ['ADMIN REIMBURSEMENTS'], route: '/admin/reimbursement/projects' },
      { label: 'Vendors', rights: ['ADMIN REIMBURSEMENTS'], route: '/admin/reimbursement/vendors' },
      { label: 'Reports', rights: ['ADMIN REIMBURSEMENTS'], route: '/admin/reimbursement/reports' }
    ] }
  ] },
  { label: 'Team', rights: ['ADMIN TEAM'], icon: 'setting', items: [
    { label: 'Activities', rights: ['ADMIN TEAM'], route: '/admin/activities' },
    { label: 'Apps', rights: ['ADMIN TEAM'], route: '/admin/apps' },
    { label: 'Settings', rights: ['ADMIN TEAM'], route: '/admin/settings' },
    { label: 'Users', rights: ['ADMIN TEAM'], route: '/admin/users' }
  ] }
]
