import React from 'react'
import Container from 'ui/components/container'
import Main from 'portals/admin/components/main'

class Show extends React.Component {

  render() {
    console.log(this.props)
    return (
      <Main {...this._getMain()}>
        <p>{this.props.contact.full_name}</p>
        <p>{this.props.contact.email}</p>
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

}

const mapEndpointsToProps = (props) => ({
  contact: `/admin/crm/contacts/${props.params.id}`
})

export default Container(mapEndpointsToProps)(Show)
