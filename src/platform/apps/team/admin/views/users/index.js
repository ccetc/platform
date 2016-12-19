import React from 'react'
import { Link } from 'react-router'
import Page from 'portals/admin/containers/page'
import Collection from 'portals/admin/components/collection'
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
      endpoint: '/admin/users',
      columns: [
        { label: 'Name', key: 'first_name', primary: true, format: NameCell },
        { label: 'Email', key: 'email' }
      ],
      sort: { key: 'created_at', order: 'desc' },
      entity: 'user',
      empty: 'There are no users',
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/users/#{id}/edit'}
      ]
    }
  }

}

var NameCell = (props) => {
  return (
    <Link to={`/admin/users/${props.id}` }>
      <img src={props.photo} className="ui circular image" />
      {props.first_name} {props.last_name}
    </Link>
  )
}

const mapPropsToPage = (props, context) => ({
  back: '/admin',
  title: 'Users',
  task: {
    label: 'New User',
    icon: 'plus',
    component: New
  }
})

export default Page(mapPropsToPage)(Index)