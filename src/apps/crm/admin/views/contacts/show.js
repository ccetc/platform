import React from 'react'
import Container from 'ui/components/container'
import Tabs from 'ui/components/tabs'
import Main from 'portals/admin/components/main'

class Show extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <Tabs {...this._getTabs()} />
      </Main>
    )
  }

  _getMain() {
    return {
      title: this.props.contact.full_name,
      permissions: [
        'can access contacts'
      ],
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Contacts', route: '/admin/crm/contacts' },
        { label: this.props.contact.full_name }
      ]
    }
  }

  _getTabs() {
    return {
      id: 'contact-show-tabs',
      tabs: [
        { label: 'Tab1', content: One },
        { label: 'Tab2', content: Two },
        { label: 'Tab3', content: Three }
      ]
    }
  }

}

const One = (props) => {
  return <div>one</div>
}

const Two = (props) => {
  return <div>Two</div>
}

const Three = (props) => {
  return <div>Three</div>
}

const mapEndpointsToProps = (props) => ({
  contact: `/admin/crm/contacts/${props.params.id}`
})

export default Container(mapEndpointsToProps)(Show)
