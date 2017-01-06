import React from 'react'
import Details from 'portals/admin/components/details'
import Page from 'portals/admin/containers/page'
import Avatar from 'portals/admin/components/avatar'
import Edit from './edit'

class Show extends React.Component {

  render() {
    const { role } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <Details {...this._getDetails()} />
        </div>
        <div className="chrome-content">
          <div className="ui two item pointing menu">
            <a className="active item">Users</a>
            <a className="item">Access</a>
          </div>
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
