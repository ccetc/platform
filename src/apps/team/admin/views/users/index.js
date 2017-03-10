import React from 'react'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'
import Avatar from 'admin/components/avatar'
import moment from 'moment'
import New from './new'

class Index extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <Collection {...this._getCollection()} />
      </div>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/team/users',
      columns: [
        { label: 'Name', key: 'first_name', primary: true, format: NameCell },
        { label: 'Active', key: 'last_active_at', primary: true, format: ActiveCell }
      ],
      filters: [
        { label: 'Role', name: 'role_id', type: 'select', multiple: true, endpoint: '/admin/team/roles', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
        { label: 'Active', name: 'is_active', type: 'select', options: [{ value: '1', text: 'Active' }, { value: '0', text: 'Inactive' }] },
        { label: 'Online', name: 'last_online_at', type: 'select', options: [{ value: 'now', text: 'Online Now' }, { value: 'today', text: 'Today' }, { value: 'today', text: 'Yesterday' }, { value: 'this_week', text: 'This Week' }, { value: 'null', text: 'Never' }] }
      ],
      link: '/admin/team/users/#{id}',
      entity: 'user',
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/team/users/#{id}/edit'}
      ],
      sort: { key: 'last_name', order: 'asc' }
    }
  }

}

var NameCell = (props) => {
  return (
    <div>
      <Avatar user={ props } />
      <strong>{ props.first_name } { props.last_name }</strong><br />
      { props.email }
    </div>
  )
}

var ActiveCell = (props) => {
  if(!props.last_online_at) {
    return <i className="circle absent icon" />
  }
  const last_online_at = moment(props.last_online_at)
  const diff = moment().diff(last_online_at, 'minutes')
  if(diff > 15) {
    return <i className="circle absent icon" />
  } else if(diff > 10) {
    return <i className="circle abandoned icon" />
  } else if(diff > 5) {
    return <i className="circle waiting icon" />
  } else {
    return <i className="circle present icon" />
  }
}

const mapPropsToPage = (props, context) => ({
  title: 'Users',
  rights: ['team.manage_people'],
  task: {
    label: 'New User',
    icon: 'plus',
    modal: New
  }
})

export default Page(mapPropsToPage)(Index)
