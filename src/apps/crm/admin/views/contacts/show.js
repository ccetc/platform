import React from 'react'
import Card from 'ui/components/card'
import Container from 'ui/components/container'
import Tabs from 'ui/components/tabs'
import Main from 'portals/admin/components/main'

class Show extends React.Component {

  render() {
    return (
      <Main {...this._getMain()}>
        <div className="chrome-sidebar">
          <Card {...this._getCard()} />
        </div>
        <div className="chrome-content">
          <Tabs {...this._getTabs()} />
        </div>
      </Main>
    )
  }

  _getMain() {
    const { contact } = this.props
    return {
      back: '/admin/crm/contacts',
      title: contact.full_name,
      permissions: [
        'can access contacts'
      ],
      tasks: [
        { label: 'Edit Contact', route: '/admin/crm/contacts' }
      ]
    }
  }

  _getCard() {
    const { contact } = this.props
    return {
      id: 'contacts-show-card',
      image: contact.photo,
      items: [
        { label: 'Email ', content: contact.email, format: 'email' },
        { label: 'Phone ', content: '123-456-7890' },
        { label: 'Fax ', content: '123-456-7890' },
        { label: 'Created ', content: contact.created_at, format: 'date' }
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
  return <div>one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one<br />one</div>
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
