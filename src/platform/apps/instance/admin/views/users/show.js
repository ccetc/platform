import React from 'react'
import Card from 'ui/components/card'
import Container from 'ui/components/container'
import Page from 'portals/admin/components/page'
import Edit from './edit'

class Show extends React.Component {

  static contextTypes = {
    flash: React.PropTypes.object
  }

  render() {
    return (
      <Page {...this._getMain()}>
        <div className="chrome-sidebar">
          <Card {...this._getCard()} />
        </div>
        <div className="chrome-content"></div>
      </Page>
    )
  }

  _getMain() {
    return {
      back: '/admin/users',
      title: 'User',
      permissions: [],
      tasks: [
        { label: 'Edit User', component: <Edit /> },
        { label: 'Reset Password', handler: this._handleResetPassword.bind(this) },
        { label: 'Sign Out of All Devices', handler: this._handleSignOutAllDevices.bind(this) }
      ]
    }
  }

  _getCard() {
    const { user } = this.props
    return {
      image: user.photo,
      items: [
        { label: 'Name ', content: user.full_name },
        { label: 'Email ', content: user.email, format: 'email' },
        { label: 'Created ', content: user.created_at, format: 'date' }
      ]
    }
  }

  _handleResetPassword() {
    this.context.flash.set('success', 'A reset email has been sent to the user')
  }

  _handleSignOutAllDevices() {
    this.context.flash.set('success', 'The user has been signed out of all devices')

  }

}

const mapEndpointsToProps = (props) => ({
  user: `/admin/users/${props.params.id}`
})

export default Container(mapEndpointsToProps)(Show)
