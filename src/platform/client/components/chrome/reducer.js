import * as actionTypes from './action_types'

const INITIAL_STATE = {
  expanded: false,
  active: null,
  apps: [
    { name: 'Contacts', icon: 'user', route: '/crm/contacts' },
    { name: 'Settings', icon: 'setting', route: '/settings/apps' }
  ],
  notifications: [
    // { story: { text: 'This is what happened' } },
    // { story: { text: 'This is what happened next' } }
  ],
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
      expanded: !state.expanded
    }

  case actionTypes.CHANGE_APP:
    return {
      ...state,
      active: action.index,
      expanded: false
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
