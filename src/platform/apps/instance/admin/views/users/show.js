import React from 'react'
import Card from 'ui/components/card'
import Container from 'ui/components/container'
import Page from 'portals/admin/components/page'
import Edit from './edit'

class Show extends React.Component {

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
    const { user } = this.props
    return {
      back: '/admin/instance/users',
      title: user.full_name,
      permissions: [],
      tasks: [
        { label: 'Edit User', component: <Edit /> }
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


}

const mapEndpointsToProps = (props) => ({
  user: `/admin/instance/users/${props.params.id}`
})

export default Container(mapEndpointsToProps)(Show)