import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  status: 'pending',
  access: [
    { id: 1, title: 'Team', installed: false, rights: [
      { id: 1, text: 'Right 1', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false },
      { id: 2, text: 'Right 2', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
      { id: 3, text: 'Right 3', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
      { id: 4, text: 'Right 4', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true }
    ]},
    { id: 2, title: 'Reimbursement', installed: true, rights: [
      { id: 5, text: 'Right 1', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false },
      { id: 6, text: 'Right 2', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false },
      { id: 7, text: 'Right 3', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
      { id: 8, text: 'Right 4', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true }
    ]},
    { id: 3, title: 'Competency', installed: true, rights: [
      { id: 9, text: 'Right 1', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
      { id: 10, text: 'Right 2', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false },
      { id: 11, text: 'Right 3', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
      { id: 12, text: 'Right 4', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false }
    ]},
    { id: 4, title: 'Learning', installed: true, rights: [
      { id: 13, text: 'Right 1', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
      { id: 14, text: 'Right 2', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
      { id: 15, text: 'Right 3', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: true },
      { id: 16, text: 'Right 4', description: 'Stumptown kogi brooklyn pabst activated charcoal mixtape. Ramps locavore skateboard.', assigned: false }
    ]}
  ]
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.TOGGLE_APP:
    return {
      ...state,
      access: state.access.map((app, index) => {
        if(index === action.index) {
          return {
            ...app,
            installed: !app.installed
          }
        } else {
          return app
        }
      })
    }

  case actionTypes.TOGGLE_RIGHT:
    return {
      ...state,
      access: state.access.map((app, appIndex) => {
        if(appIndex === action.appIndex) {
          return {
            ...state.access[appIndex],
            rights: state.access[appIndex].rights.map((right, index) => {
              if(index === action.index) {
                return {
                  ...right,
                  assigned: !right.assigned
                }
              } else {
                return right
              }
            })
          }
        } else {
          return app
        }
      })
    }

  default:
    return state

  }

}
