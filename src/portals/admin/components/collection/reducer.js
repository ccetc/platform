import * as actionTypes from './action_types'

export const INITIAL_STATE = {
  params: {
    filter: {
      user_id: [
        { id: 1, text: 'Greg Kops' },
        { id: 2, text: 'Sharon Anderson' },
        { id: 3, text: 'Ken Schlather' }
      ],
      project_id: [
        { id: 1, text: 'Primitive Pursuits' },
        { id: 2, text: 'Eat Smart New York' }
      ]
    },
    sort: {
      key: 'created_at',
      order: 'desc'
    }
  }
}

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {

  case actionTypes.SORT:
    return {
      ...state,
      params: {
        ...state.params,
        sort: {
          key: action.key,
          order: (state.params.sort.key == action.key && state.params.sort.order == 'asc') ? 'desc' : 'asc'
        }
      }
    }

  default:
    return state

  }

}
