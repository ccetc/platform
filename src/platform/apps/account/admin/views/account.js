import React from 'react'
import Card from 'ui/components/card'
import Container from 'ui/components/container'
import Page from 'portals/admin/components/page'
import Edit from './edit'
import Password from './password'

class Account extends React.Component {

  static contextTypes = {
    session: React.PropTypes.object
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
      back: '/admin',
      title: 'Account',
      permissions: [],
      tasks: [
        { label: 'Edit Profile', component: <Edit /> },
        { label: 'Change Password', component: <Password /> },
        { label: 'Sign Out', handler: this._handleSignout.bind(this) }
      ]
    }
  }

  _getCard() {
    const { user } = this.props
    return {
      image: user.photo,
      items: [
        { label: 'Email ', content: user.email, format: 'email' },
        { label: 'Created ', content: user.created_at, format: 'date' }
      ]
    }
  }

  _handleSignout() {
    this.context.session.signout()
  }

}

const mapEndpointsToProps = (props) => ({
  user: '/admin/account/account'
})

export default Container(mapEndpointsToProps)(Account)
