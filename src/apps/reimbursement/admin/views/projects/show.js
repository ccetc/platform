import React from 'react'
import Card from 'portals/admin/components/card'
import Page from 'portals/admin/components/page'
import Edit from './edit'
import Member from './member'

class Show extends React.Component {

  render() {
    const { members } = this.props
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <Card {...this._getCard()} />
        </div>
        <div className="chrome-content">
          <div className="project-members">
            <h2>Members</h2>
            {members.map((member, index) => {
              return (
                <div key={`member_${index}`} className="project-member" to={`/admin/reimbursement/projects/${member.project_id}/members/${member.id}`}>
                  <img src={ member.user.photo.url } className="ui circular image" title={ member.user.full_name } />
                  <p>
                    <strong>{member.user.full_name}</strong><br />
                    {member.user.email}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  _getCard() {
    const { project } = this.props
    return {
      items: [
        { label: 'Title ', content: project.title },
        { label: 'Code ', content: project.code, format: 'code' },
        { label: 'Created ', content: project.created_at, format: 'datetime' }
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  back: '/admin/reimbursement/projects',
  title: 'Project',
  permissions: [],
  tasks: [
    { label: 'Edit Project', component: Edit },
    { label: 'Add Member', component: Member }
  ],
  resources: {
    project: `/admin/reimbursement/projects/${props.params.id}`,
    members: `/admin/reimbursement/projects/${props.params.id}/members`
  }
})

export default Page(mapPropsToPage)(Show)
