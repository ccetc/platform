import _ from 'lodash'
import collection from 'ui/components/collection/reducer'
import form from 'ui/components/form/reducer'
import infinite from 'ui/components/infinite/reducer'

const ADD_COMPONENT: string = 'component/ADD_COMPONENT'
const REMOVE_COMPONENT: string = 'component/REMOVE_COMPONENT'

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

  const INITIAL_STATE = {
    components: []
  }

  return (state = INITIAL_STATE, action) => {

    const namespace = action.type.split('/')[0]
    const identifier = (action.cid) ? `${action.namespace}-${action.cid}` : action.namespace

    if(action.type == ADD_COMPONENT) {

      if(action.cid) {

        return {
          ...state,
          [action.namespace]: {
            ...state[action.namespace],
            [action.cid]: reducers[action.namespace](undefined, action)
          },
          components: [
            ...state.components,
            identifier
          ]
        }

      } else {

        return {
          ...state,
          [action.namespace]: reducers[action.namespace](undefined, action),
          components: [
            ...state.components,
            identifier
          ]
        }

      }

    } else if(action.type == REMOVE_COMPONENT) {

      if(action.cid) {

        return  {
          ...state,
          [action.namespace]: _.omit(state[action.namespace], action.cid),
          components: _.pull(state.components, identifier)
        }

      } else {

        return  {
          ..._.omit(state, action.namespace),
          components: _.pull(state.components, identifier)
        }

      }

    } else if(reducers[namespace]) {

      if(action.cid) {

        return {
          ...state,
          [namespace]: {
            ...state[namespace],
            [action.cid]: reducers[namespace](state[namespace][action.cid], action)
          }
        }

      } else {

        return {
          ...state,
          [namespace]: reducers[namespace](state[namespace], action)
        }

      }

    } else {

      return state

    }

  }
}
