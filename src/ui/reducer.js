import _ from 'lodash'
import collection from 'ui/components/collection/reducer'
import form from 'ui/components/form/reducer'
import infinite from 'ui/components/infinite/reducer'

const ADD_COMPONENT: string = 'multicomponent/ADD_COMPONENT'
const REMOVE_COMPONENT: string = 'multicomponent/REMOVE_COMPONENT'

export const addComponent = (namespace, cid) => {
  let action = {
    type: ADD_COMPONENT,
    namespace
  }
  if(cid) action.cid = cid
  return action
}

export const removeComponent = (namespace, cid) => {
  let action = {
    type: REMOVE_COMPONENT,
    namespace
  }
  if(cid) action.cid = cid
  return action

}

export default (applicationReducers) => {

  const reducers = {
    ...applicationReducers,
    collection,
    form,
    infinite
  }

  return (state, action) => {

    const namespace = action.type.split('/')[0]

    if(action.type == ADD_COMPONENT) {

      return  {
        ...state,
        [action.namespace]: reducers[action.namespace](state[action.namespace], { type: null, cid: action.cid })
      }

    } else if(action.type == REMOVE_COMPONENT) {

      return  {
        ...state,
        [action.namespace]: _.omit(state[action.namespace], action.cid)
      }

    } else if(reducers[namespace]) {

      return {
        ...state,
        [namespace]: reducers[namespace](state[namespace], action)
      }

    } else if(state === undefined) {

      return Object.keys(reducers).reduce((state, key) => {
        return {
          ...state,
          [key]: reducers[key](undefined, action)
        }
      }, {})

    } else {

      return state

    }

  }
}
