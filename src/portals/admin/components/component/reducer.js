import _ from 'lodash'
import * as actionTypes from './action_types'

import collection from 'portals/admin/components/collection/reducer'
import form from 'portals/admin/components/form/reducer'
import filefield from 'portals/admin/controls/filefield/reducer'
import infinite from 'portals/admin/components/infinite/reducer'
import tabs from 'portals/admin/components/tabs/reducer'

const reducers = {
  collection,
  form,
  filefield,
  infinite,
  tabs
}

export default (state = { components: [] }, action) => {

  const namespace = action.type.split('/')[0]
  const index = (action.cid) ? `${action.tid}-${action.cid}` : action.tid
  const identifier = (action.cid) ? `${action.namespace}-${action.tid}-${action.cid}` : `${action.namespace}-${action.tid}`
  if(action.type === actionTypes.ADD) {

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

  } else if(action.type === actionTypes.REMOVE) {

    return  {
      ...state,
      [action.namespace]: _.omit(state[action.namespace], action.cid),
      components: _.pull(state.components, identifier)
    }

  } else if(reducers[namespace]) {

    return {
      ...state,
      [namespace]: {
        ...state[namespace],
        [action.cid]: reducers[namespace](state[namespace][index], action)
      }
    }

  } else {

    return state

  }

}
