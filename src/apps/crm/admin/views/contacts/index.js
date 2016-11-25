import React from 'react'
import { Link } from 'react-router'
import Page from 'portals/admin/components/page'
import Collection from 'ui/components/collection'

class Index extends React.Component {

  render() {
    return (
      <Page {...this._getMain()}>
        <Collection {...this._getCollection()} />
      </Page>
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
      entity: 'contact',
      empty: 'There are no contacts',
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/crm/contacts/#{id}/edit'}
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
  return (
    <Link to={`/admin/crm/contacts/${props.id}` }>
      {props.first_name} {props.last_name}
    </Link>
  )
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

export default Index
