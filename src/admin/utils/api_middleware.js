import _ from 'lodash'
import qs from 'qs'
import rest from 'platform/services/rest'
import localforage from 'platform/services/localforage'

export default store => next => action => {

  if(action.type !== 'api/REQUEST') {
    return next(action)
  }

  return localforage.getItem('teams', (err, teams) => {

    const activeTeam = teams.reduce((active, team) => {
      return (team.active) ? team : active
    }, null)

    const params = action.params || {}

    const token = action.token || params.token || activeTeam.token

    const headers = {
      'Content-Type': 'application/json',
      ...token ? { 'Authorization': `Bearer ${token}` }: {}
    }

    const method = action.method || 'GET'

    const path = (action.params && action.method === 'GET') ? `/api${action.endpoint}?${qs.stringify(action.params)}` : `/api${action.endpoint}`

    const entity = (action.params && action.method !== 'GET') ? action.params : null

    const request = _.omitBy({ headers, method, path, entity }, _.isNil)

    store.dispatch({
      type: action.request,
      cid: action.cid,
      params: action.params,
      ...action.meta
    })

    const success = (json) => {

      store.dispatch({
        type: action.success,
        cid: action.cid,
        ...action.meta,
        ...json
      })

    }

    const failure = (response) => {

      if(response.status.code == 401) {

        return store.dispatch({
          type: 'platform.admin/REMOVE_ALL_TEAMS'
        })

      }

      store.dispatch({
        type: action.failure,
        cid: action.cid,
        ...action.meta,
        ...response.entity
      })

    }

    return rest(request).then(response => response.entity).then(success, failure)

  })

}
