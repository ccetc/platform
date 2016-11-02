import * as actionTypes from './action_types'

const INITIAL_STATE = {
  apps: null,
  flash: null,
  user: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SIGNIN_SUCCESS:
    return {
      ...state,
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
      flash: null,
      user: {
        name: 'Greg Kops',
        email: 'gmk8@cornell.edu',
        photo: '/images/greg.jpg'
      }
    }

  case actionTypes.SIGNIN_FAILURE:
    return {
      ...state,
      flash: {
        style: 'error',
        message: 'Unable to find your account'
      }
    }

  case actionTypes.SIGNOUT:
    return {
      ...state,
      apps: null,
      flash: {
        style: 'success',
        message: 'You have been successfully signed out'
      },
      user: null
    }

  case actionTypes.SET_FLASH:
    return {
      ...state,
      flash: {
        style: action.style,
        message: action.message
      }
    }

  case actionTypes.CLEAR_FLASH:
    return {
      ...state,
      flash: null
    }

  default:
    return state
  }
}
