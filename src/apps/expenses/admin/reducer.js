import members from './components/members/reducer.js'
import expense_types from './components/expense_types/reducer.js'
import approve from './components/approve/reducer.js'
import submit from './components/submit/reducer.js'

export default (state, component, action) => {

  if(state === undefined) {

    return {
      members: members(undefined, action),
      approve: approve(undefined, action),
      submit: submit(undefined, action),
      expense_types: approve(undefined, action)
    }

  } else if(component === 'members') {

    return {
      ...state,
      members: members(state.members, action)
    }

  } else if(component === 'approve') {

    return {
      ...state,
      approve: approve(state.approve, action)
    }

  } else if(component === 'submit') {

    return {
      ...state,
      submit: submit(state.submit, action)
    }

  } else if(component === 'expense_types') {

    return {
      ...state,
      expense_types: expense_types(state.expense_types, action)
    }

  } else {

    return state

  }

}
