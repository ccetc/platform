import React from 'react'
import Card from 'ui/components/card'
import Page from 'portals/admin/components/chrome/page'
import Edit from './edit'

class Show extends React.Component {

  static contextTypes = {
    flash: React.PropTypes.object
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

}

const mapPropsToPage = (props, context) => {

  const _handleResetPassword = () => {
    context.flash.set('success', 'A reset email has been sent to the user')
  }

  const _handleSignOutAllDevices = () => {
    context.flash.set('success', 'The user has been signed out of all devices')
  }

  return {
    back: '/admin/users',
    title: 'User',
    permissions: [],
    tasks: [
      { label: 'Edit User', component: Edit },
      { label: 'Reset Password', handler: _handleResetPassword },
      { label: 'Sign Out of All Devices', handler: _handleSignOutAllDevices }
    ],
    resources: {
      user: `/admin/users/${props.params.id}`
    }
  }
}

export default Page(mapPropsToPage)(Show)
