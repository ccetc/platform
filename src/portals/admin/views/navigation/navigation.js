module.exports = [
  { label: 'Reimbursement', icon: 'dollar', items: [
    { label: 'Advances', route: '/admin/reimbursement/advances' },
    { label: 'Expenses', route: '/admin/reimbursement/expenses' },
    { label: 'Trips', route: '/admin/reimbursement/trips' },
    { label: 'Admin', items: [
      { label: 'Expense Types', route: '/admin/reimbursement/expense_types' },
      { label: 'Projects', route: '/admin/reimbursement/projects' },
      { label: 'Vendors', route: '/admin/reimbursement/vendors' },
      { label: 'Reports', route: '/admin/reimbursement/reports' }
    ] }
  ] },
  { label: 'Team', icon: 'setting', items: [
    { label: 'Activities', route: '/admin/activities' },
    { label: 'Apps', route: '/admin/apps' },
    { label: 'Settings', route: '/admin/settings' },
    { label: 'Users', route: '/admin/users' }
  ] }
]
