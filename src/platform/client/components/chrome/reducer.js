import * as actionTypes from './action_types'

const INITIAL_STATE = {
  expanded: false,
  active: null,
  apps: [
    { name: 'Contacts', icon: 'user', route: '/crm/contacts' },
    { name: 'Settings', icon: 'setting', route: '/settings/apps' }
  ],
  user: {
    name: 'Greg Kops',
    email: 'gmk8@cornell.edu',
    photo: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-1/p320x320/11905777_10153132112387338_9017849880928176850_n.jpg?oh=5fe3364029062b65f8192a14ebc893ab&oe=58A477BA'
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

  default:
    return state
  }
}
