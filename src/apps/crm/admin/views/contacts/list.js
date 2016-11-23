import React from 'react'
import { Link } from 'react-router'
import Main from 'portals/admin/components/main'
import Collection from 'ui/components/collection'

class List extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <Collection {...this._getCollection()} />
      </Main>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/crm/contacts',
      columns: [
        { label: 'Name', key: 'first_name', primary: true, format: NameCell },
        { label: 'Email', key: 'email' }
      ],
      sort: { key: 'created_at', order: 'desc' },
      card: {
        image: 'photo',
        url: '/admin/contacts/#{id}',
        content: ContentCard
      },
      entity: 'contact',
      empty: 'There are no contacts',
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/crm/contacts/#{id}/edit'}
      ],
      batchActions: [
        { label: 'add to list', component: AddToList },
        { label: 'delete all', component: AddToList },
        { label: 'tag all', component: AddToList }
      ]
    }
  }

  _getMain() {
    return {
      back: '/admin',
      title: 'Contacts'
    }
  }

}

var NameCell = (props) => {
  return <Link to={`/admin/crm/contacts/${props.id}` }><img src={props.photo} className="ui circular image" /> {props.first_name} {props.last_name}</Link>
}

const ContentCard = (props) => {
  return (
    <div>
      <h4>{props.first_name} {props.last_name}</h4>
      <p>{props.email}</p>
    </div>
  )
}

var AddToList = (props) => {
  return (
    <div className="modal">
      <div className="ui dimmer modals page transition visible active">
        <div className="ui standard modal media transition visible active scrolling">
          <div className="header">
            Add to List
          </div>
          {props.ids.join('+')}
        </div>
      </div>
    </div>
  )
}

export default List
