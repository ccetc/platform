import * as actionTypes from './action_types'

const INITIAL_STATE = {
  signin: {
    status: 'ready'
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SIGNIN_REQUEST:
    return {
      ...state,
      signin: {
        ...state.session,
        status: 'submitting'
      },
      flash: null
    }

  case actionTypes.SIGNIN_SUCCESS:
    return {
      ...INITIAL_STATE,
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
      user: {
        name: 'Greg Kops',
        email: 'gmk8@cornell.edu',
        photo: '/images/greg.jpg',
        permissions: [
          'can access contacts',
          'can access expenses',
          'can access instance'
        ]
      }
    }

  case actionTypes.SIGNIN_FAILURE:
    return {
      ...state,
      flash: {
        style: 'error',
        message: action.error.message
      },
      signin: {
        status: 'ready'
      }
    }

  default:
    return state
  }
}
