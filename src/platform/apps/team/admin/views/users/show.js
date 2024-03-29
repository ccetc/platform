import React from 'react'
import moment from 'moment'
import Avatar from 'admin/components/avatar'
import Details from 'admin/components/details'
import Tabs from 'admin/components/tabs'
import Page from 'admin/components/page'
import Access from '../access'
import Edit from './edit'

class Show extends React.Component {

  render() {
    const { user } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <Details {...user} {...this._getDetails()} />
        </div>
        <div className="chrome-content">
          <Tabs {...this.props} {...this._getTabs()} />
        </div>
      </div>
    )
  }

  _getDetails() {
    const { user } = this.props
    return {
      top: <Avatar user={ user } width="150" />,
      items: [
        { label: 'Name ', content: user.full_name },
        { label: 'Email ', content: user.email, format: 'email' },
        { label: 'Active? ', content: user.is_active, format: 'yes_no' },
        { label: 'Last Online ', format: LastOnlineFormat }
      ]
    }
  }

  _getTabs() {
    return {
      tabs: [
        { label: 'Roles', content: Roles },
        { label: 'Access', content: Access }
      ]
    }
  }

}

const LastOnlineFormat = (props) => {
  if(!props.last_online_at) {
    return <span><i className="circle absent icon" /> NEVER</span>
  } else {
    const last_online_at = moment(props.last_online_at)
    const diff = moment().diff(last_online_at, 'minutes')
    if(diff > 15) {
      return <span><i className="circle absent icon" /> { moment(props.last_online_at).format('MM/DD/YY @ hh:mm A') }</span>
    } else if(diff > 10) {
      return <span><i className="circle abandoned icon" /> { moment(props.last_online_at).fromNow() }</span>
    } else if(diff > 5) {
      return <span><i className="circle waiting icon" /> { moment(props.last_online_at).fromNow() }</span>
    } else {
      return <span><i className="circle present icon" /> ONLINE NOW</span>
    }
  }

}

const Roles = (props) => {
  const { user } = props
  return (
    <div className="list role-users">
      { user.roles.length === 0 &&
        <div className="item">
          <p>This user has not been assigned any roles</p>
        </div>
      }
      { user.roles.map((role, index) => {
        return (
          <div key={`role_${index}`} className="item role-user">
            <strong>{ role.title }</strong><br />
            { role.description }
          </div>
        )
      }) }
    </div>
  )
}


const mapResourcesToPage = (props, context) => ({
  user: `/admin/team/users/${props.params.id}`,
  access: `/admin/team/users/${props.params.id}/access`
})

const mapPropsToPage = (props, context, resources) => {

  const _handleResetPassword = () => {
    context.flash.set('success', 'A reset email has been sent to the user')
  }

  const _handleSignOutAllDevices = () => {
    context.flash.set('success', 'The user has been signed out of all devices')
  }

  return {
    title: resources.user.full_name,
    rights: ['team.manage_people'],
    tasks: [
      { label: 'Edit User', modal: Edit },
      { label: 'Reset Password', handler: _handleResetPassword },
      { label: 'Sign Out of All Devices', handler: _handleSignOutAllDevices }
    ]
  }
}

export default Page(mapResourcesToPage, mapPropsToPage)(Show)
