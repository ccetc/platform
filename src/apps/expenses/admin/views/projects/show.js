import React from 'react'
import Card from 'ui/components/card'
import Container from 'ui/components/container'
import Page from 'portals/admin/components/page'
import Edit from './edit'
import Member from './member'

class Show extends React.Component {

  render() {
    const { members } = this.props
    return (
      <Page {...this._getMain()}>
        <div className="chrome-sidebar">
          <Card {...this._getCard()} />
        </div>
        <div className="chrome-content">
          <div className="project-members">
            <h2>Members</h2>
            {members.map((member, index) => {
              return (
                <div key={`member_${index}`} className="project-member" to={`/admin/expenses/projects/${member.project_id}/members/${member.id}`}>
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
      </Page>
    )
  }

  _getMain() {
    return {
      back: '/admin/expenses/projects',
      title: 'Project',
      permissions: [],
      tasks: [
        { label: 'Edit Project', component: <Edit /> },
        { label: 'Add Member', component: <Member /> }
      ]
    }
  }

  _getCard() {
    const { project } = this.props
    return {
      items: [
        { label: 'Title ', content: project.title },
        { label: 'Code ', content: project.code, format: 'code' },
        { label: 'Created ', content: project.created_at, format: 'datatime' }
      ]
    }
  }

}


const mapEndpointsToProps = (props) => ({
  project: `/admin/expenses/projects/${props.params.id}`,
  members: `/admin/expenses/projects/${props.params.id}/members`
})

export default Container(mapEndpointsToProps)(Show)
