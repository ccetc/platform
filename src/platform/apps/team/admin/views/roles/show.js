import React from 'react'
import Details from 'portals/admin/components/details'
import Page from 'portals/admin/containers/page'
import Tabs from 'portals/admin/components/tabs'
import Avatar from 'portals/admin/components/avatar'
import Edit from './edit'

class Show extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <Details {...this._getDetails()} />
        </div>
        <div className="chrome-content">
          <Tabs {...this.props} {...this._getTabs()} />
        </div>
      </div>
    )
  }

  _getDetails() {
    const { role } = this.props
    return {
      items: [
        { label: 'Title ', content: role.title },
        { label: 'Description ', content: role.description }
      ]
    }
  }

  _getTabs() {
    return {
      tabs: [
        { label: 'Users', content: Users },
        { label: 'Access', content: Access }
      ]
    }
  }

}

const Users = (props) => {
  const { role } = props
  return (
    <div className="role-users">
      { role.users.map(user => {
        return (
          <div className="role-user">
            <Avatar user={ user } />
            <strong>{ user.full_name }</strong><br />
            { user.email }
          </div>
        )
      }) }
    </div>
  )
}

const Access = (props) => {
  return (
    <div className="role-access">
      <div className="role-access-app">
        TEAM
      </div>
      <div className="role-access-rights">
        <strong>admin team</strong><br />
        user can manage team settings
      </div>
      <div className="role-access-rights">
        <strong>admin team</strong><br />
        user can manage team settings
      </div>
      <div className="role-access-rights">
        <strong>admin team</strong><br />
        user can manage team settings
      </div>
      <div className="role-access-app">
        TEAM
      </div>
      <div className="role-access-rights">
        <strong>admin team</strong><br />
        user can manage team settings
      </div>
      <div className="role-access-rights">
        <strong>admin team</strong><br />
        user can manage team settings
      </div>
    </div>
  )
}

const mapPropsToPage = (props, context) => {

  return {
    title: 'Role',
    rights: [],
    tasks: [
      { label: 'Edit Role', modal: Edit }
    ],
    resources: {
      role: `/admin/roles/${props.params.id}`
    }
  }
}

export default Page(mapPropsToPage)(Show)
