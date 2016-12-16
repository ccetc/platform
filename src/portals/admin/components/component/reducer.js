import _ from 'lodash'
import * as actionTypes from './action_types'

import container from 'portals/admin/containers/container/reducer'
import drawer from 'portals/admin/containers/drawer/reducer'
import modal from 'portals/admin/containers/modal/reducer'
import navigation from 'portals/admin/containers/navigation/reducer'
import search from 'portals/admin/containers/search/reducer'
import socket from 'portals/admin/containers/socket/reducer'
import tasks from 'portals/admin/containers/tasks/reducer'

import reset from 'portals/admin/session/reset/reducer'

import collection from 'portals/admin/components/collection/reducer'
import form from 'portals/admin/components/form/reducer'
import infinite from 'portals/admin/components/infinite/reducer'
import tabs from 'portals/admin/components/tabs/reducer'

const reducers = {
  collection,
  container,
  drawer,
  form,
  infinite,
  modal,
  navigation,
  reset,
  search,
  socket,
  tabs,
  tasks
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
        [index]: reducers[action.namespace](undefined, action)
      },
      components: [
        ...state.components,
        identifier
      ]
    }

  } else if(action.type === actionTypes.REMOVE) {

    return  {
      ...state,
      [action.namespace]: _.omit(state[action.namespace], index),
      components: _.pull(state.components, identifier)
    }

  } else if(reducers[namespace]) {

    return {
      ...state,
      [namespace]: {
        ...state[namespace],
        [index]: reducers[namespace](state[namespace][index], action)
      }
    }

  } else {

    return state

  }

}
