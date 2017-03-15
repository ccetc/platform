import client from 'admin/utils/rest'
import _ from 'lodash'

export default (user, token) => {

  return client({
    path: '/expenses/memberships',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(response => {

    return response.entity.data.reduce((allowed, membership) => {

      return !allowed ? _.includes(['owner','approver'], membership.member_type) : true

    }, false)

  })

}
