import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import Edit from './edit'
import Tabs from 'admin/components/tabs'
import Avatar from 'admin/components/avatar'
import NewMember from './members/new'
import EditMember from './members/edit'
import ExpenseTypes from '../../components/expense_types'

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
    const { project } = this.props
    return {
      items: [
        { label: 'Title ', content: project.title },
        { label: 'Code ', content: project.code, format: 'code' },
        { label: 'Active ', content: project.is_active, format: 'yes_no' }
      ]
    }
  }

  _getTabs() {
    return {
      tabs: [
        { label: 'Members', content: Members },
        { label: 'Expense Types', content: ExpenseTypes }
      ]
    }
  }

}

class Members extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    const { members } = this.props
    return (
      <div className="list project-members">
        { members.length === 0 &&
          <div className="item">
            <p>This project does not yet have any members yet</p>
          </div>
        }
        { members.map((member, index) => {
          const badge = member.is_active ? member.member_type.name : 'inactive'
          return (
            <div key={`member_${index}`} className="item project-member" onClick={this._handleEdit.bind(this, member.id)}>
              <Avatar user={ member.user } width="40" />
              <p>
                <strong>{ member.user.full_name }</strong><br />
                { member.user.email }
              </p>
              <div className={badge.toLowerCase()}><span>{badge.toUpperCase()}</span></div>
            </div>
          )
        }) }
      </div>

    )
  }

  _handleEdit(id) {
    this.context.modal.push(<EditMember {...this.props} member_id={id} />)
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Project',
  rights: ['expenses.manage_configuration'],
  tasks: [
    { label: 'Edit Project', modal: Edit },
    { label: 'Add Member', modal: NewMember }
  ],
  resources: {
    project: `/admin/expenses/projects/${props.params.id}`,
    members: `/admin/expenses/projects/${props.params.id}/members`
  }
})

export default Page(mapPropsToPage)(Show)
