import * as actionTypes from './action_types'
import _ from 'lodash'

const INITIAL_STATE = {
  apps: null,
  drawer: {
    expanded: false,
    app: null,
    item: null
  },
  flash: null,
  notifications: {
    queue: [],
    unread: 1
  },
  search: {
    query: '',
    active: false,
    results: [],
    choice: null
  },
  session: {
    mode: 'signin'
  },
  user: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.CHANGE_MODE:
    return {
      ...state,
      session: {
        mode: action.mode
      },
      flash: null
    }

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

  case actionTypes.RESET_FAILURE:
    return {
      ...state,
      flash: {
        style: 'error',
        message: 'Unable to find your account'
      }
    }

  case actionTypes.RESET_SUCCESS:
    return {
      ...state,
      flash: {
        style: 'success',
        message: 'An email with instructions was sent'
      },
      session: {
        mode: 'signin'
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

  case actionTypes.TOGGLE_DRAWER:
    return {
      ...state,
      drawer: {
        ...state.drawer,
        expanded: !state.drawer.expanded
      }
    }

  case actionTypes.CHOOSE_APP:
    return {
      ...state,
      drawer: {
        ...state.drawer,
        app: (state.drawer.app === action.index) ? null : action.index
      }
    }

  case actionTypes.CHOOSE_ITEM:
    return {
      ...state,
      drawer: {
        ...state.drawer,
        item: action.index,
        expanded: false
      }
    }

  case actionTypes.PUSH_NOTIFICATION:
    return {
      ...state,
      notifications: {
        ...state.notifications,
        queue: [...state.notifications.queue, action.notification]
      }
    }

  case actionTypes.READ_NOTIFICATION:
    return {
      ...state,
      notifications: {
        ...state.notifications,
        queue: _.reject(state.notifications.queue, { id: action.id })
      }
    }

  case actionTypes.BEGIN_SEARCH:
    return {
      ...state,
      search: {
        ...state.search,
        active: true
      }
    }

  case actionTypes.ABORT_SEARCH:
    return {
      ...state,
      search: {
        ...state.search,
        active: false
      }
    }

  case actionTypes.COMPLETE_SEARCH:
    return {
      ...state,
      search: {
        ...state.search,
        query: '',
        active: false,
        results: [],
        choice: state.search.results[action.index]
      }
    }

  case actionTypes.LOOKUP:
    return {
      ...state,
      search: {
        ...state.search,
        query: action.query,
        results: (action.query.length > 0) ? [
          { name: 'Ken Schlather', email: 'ks47@cornell.edu', photo: '/images/ken.jpg', route: '/admin/crm/contacts/1' },
          { name: 'Sandy Repp', email: 'sjr37@cornell.edu', photo: '/images/sandy.jpg', route: '/admin/crm/contacts/2' },
          { name: 'Sharon Anderson', email: 'ska2@cornell.edu', photo: '/images/sharon.jpg', route: '/admin/crm/contacts/3' },
          { name: 'Greg Kops', email: 'gmk8@cornell.edu', photo: '/images/greg.jpg', route: '/admin/crm/contacts/4' },
          { name: 'Ken Schlather', email: 'ks47@cornell.edu', photo: '/images/ken.jpg', route: '/admin/crm/contacts/1' },
          { name: 'Sandy Repp', email: 'sjr37@cornell.edu', photo: '/images/sandy.jpg', route: '/admin/crm/contacts/2' },
          { name: 'Sharon Anderson', email: 'ska2@cornell.edu', photo: '/images/sharon.jpg', route: '/admin/crm/contacts/3' },
          { name: 'Greg Kops', email: 'gmk8@cornell.edu', photo: '/images/greg.jpg', route: '/admin/crm/contacts/4' }
        ] : []
      }
    }

  default:
    return state
  }
}
