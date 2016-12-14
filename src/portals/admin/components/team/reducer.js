import * as actionTypes from './action_types'

const INITIAL_STATE = {
  status: 'pending',
  title: null,
  logo: null
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.LOAD_INSTANCE_SUCCESS:
    return {
      ...state,
      status: 'success',
      title: action.data.title,
      logo: action.data.logo
    }

  case actionTypes.LOAD_INSTANCE_FAILURE:
    return {
      ...state,
      status: 'failure'
    }

  default:
    return state
  }

}
