import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  status: 'pending',
  roles: [
    { id: 1, title: 'Admin', description: 'can do everything', assigned: true },
    { id: 2, title: 'Supervisor', description: 'can do most stuff', assigned: true },
    { id: 3, title: 'Employee', description: 'can do some stuff', assigned: false }
  ]
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.TOGGLE:
    return {
      ...state,
      roles: state.roles.map((role, index) => {
        if(index === action.index) {
          return {
            ...role,
            assigned: !role.assigned
          }
        } else {
          return role
        }
      })
    }

  default:
    return state

  }

}
