import React from 'react'
import { Link } from 'react-router'
import Main from 'portals/admin/components/main'
import Collection from 'ui/components/collection'

class Index extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <Collection {...this._getCollection()} />
      </Main>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/instance/users',
      columns: [
        { label: 'Name', key: 'first_name', primary: true, format: NameCell },
        { label: 'Email', key: 'email' }
      ],
      sort: { key: 'created_at', order: 'desc' },
      entity: 'contact',
      empty: 'There are no users',
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/instance/users/#{id}/edit'}
      ]
    }
  }

  _getMain() {
    return {
      back: '/admin',
      title: 'Users'
    }
  }

}

var NameCell = (props) => {
  return (
    <Link to={`/admin/instance/users/${props.id}` }>
      <img src={props.photo} className="ui circular image" />
      {props.first_name} {props.last_name}
    </Link>
  )
}

export default Index
