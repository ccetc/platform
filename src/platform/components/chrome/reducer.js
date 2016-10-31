import * as actionTypes from './action_types'
import _ from 'lodash'

const INITIAL_STATE = {
  drawer: {
    apps: [
      { name: 'Contacts', icon: 'user', items: [
        { name: 'Contacts', route: '/crm/contacts' }
      ] },
      { name: 'Expenses', icon: 'dollar', items: [
        { name: 'Advances', route: '/expenses/advances' },
        { name: 'Expense Types', route: '/expenses/expense_types' },
        { name: 'Expenses', route: '/expenses/expenses' },
        { name: 'Projects', route: '/expenses/projects' },
        { name: 'Trips', route: '/expenses/trips' },
        { name: 'Vendors', route: '/expenses/vendors' }
      ] },
      { name: 'Settings', icon: 'setting', items: [
        { name: 'Apps', route: '/expenses/apps' },
        { name: 'Users', route: '/expenses/users' }
      ] }
    ],
    expanded: false,
    app: null,
    item: null
  },
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
  user: {
    name: 'Greg Kops',
    email: 'gmk8@cornell.edu',
    photo: '/images/greg.jpg'
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.TOGGLE_DRAWER:
    return {
      ...state,
      drawer: {
        ...state.drawer,
        expanded: !state.drawer.expanded,
        app: null,
        item: null
      }
    }

  case actionTypes.CHOOSE_APP:
    return {
      ...state,
      drawer: {
        ...state.drawer,
        app: action.index
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
          { name: 'Ken Schlather', email: 'ks47@cornell.edu', photo: '/images/ken.jpg', route: '/crm/contacts/1' },
          { name: 'Sandy Repp', email: 'sjr37@cornell.edu', photo: '/images/sandy.jpg', route: '/crm/contacts/2' },
          { name: 'Sharon Anderson', email: 'ska2@cornell.edu', photo: '/images/sharon.jpg', route: '/crm/contacts/3' },
          { name: 'Greg Kops', email: 'gmk8@cornell.edu', photo: '/images/greg.jpg', route: '/crm/contacts/4' },
          { name: 'Ken Schlather', email: 'ks47@cornell.edu', photo: '/images/ken.jpg', route: '/crm/contacts/1' },
          { name: 'Sandy Repp', email: 'sjr37@cornell.edu', photo: '/images/sandy.jpg', route: '/crm/contacts/2' },
          { name: 'Sharon Anderson', email: 'ska2@cornell.edu', photo: '/images/sharon.jpg', route: '/crm/contacts/3' },
          { name: 'Greg Kops', email: 'gmk8@cornell.edu', photo: '/images/greg.jpg', route: '/crm/contacts/4' }
        ] : []
      }
    }

  default:
    return state
  }
}
