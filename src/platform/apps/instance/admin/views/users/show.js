import React from 'react'
import Card from 'ui/components/card'
import Page from 'portals/admin/components/page'
import Edit from './edit'

class Show extends React.Component {

  static contextTypes = {
    session: React.PropTypes.object
  }

  render() {
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <Card {...this._getCard()} />
        </div>
        <div className="chrome-content"></div>
      </div>
    )
  }

  _getCard() {
    const { user } = this.props
    return {
      image: user.photo,
      items: [
        { label: 'Name ', content: user.full_name },
        { label: 'Email ', content: user.email, format: 'email' },
        { label: 'Created ', content: user.created_at, format: 'datetime' }
      ]
    }
  }

  _handleResetPassword() {
    this.context.session.setFlash('success', 'A reset email has been sent to the user')
  }

  _handleSignOutAllDevices() {
    this.context.session.setFlash('success', 'The user has been signed out of all devices')
  }

}

const details = props => ({
  back: '/admin/users',
  title: 'User',
  permissions: [],
  tasks: [
    { label: 'Edit User', component: Edit },
    { label: 'Reset Password', handler: this._handleResetPassword.bind(this) },
    { label: 'Sign Out of All Devices', handler: this._handleSignOutAllDevices.bind(this) }
  ],
  resources: {
    user: `/admin/users/${props.params.id}`
  }
})

export default Page(details)(Show)
