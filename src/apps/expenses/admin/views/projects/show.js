import React from 'react'
import { Link } from 'react-router'
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
    const { project } = this.props
    return {
      back: '/admin/expenses/projects',
      title: project.title,
      permissions: [],
      tasks: [
        { label: 'Add Member', component: <Edit /> },
        { label: 'Edit Project', component: <Edit /> }
      ]
    }
  }

  _getCard() {
    const { project, members } = this.props
    return {
      items: [
        { label: 'Code ', content: project.code, format: 'code' },
        { label: 'Members ', content: members, format: Members }
      ]
    }
  }

}

const Members = (props) => {
  const members = props.value
  return (
    <div className="project-members">
      {members.map((member, index) => {
        return (
          <Link key={`member_${index}`} className="project-member" to={`/admin/expenses/projects/${member.project_id}/members/${member.id}`}>
            <img src={ member.user.photo.url } className="ui circular image" title={ member.user.full_name } />
            <p>
              <strong>{member.user.full_name}</strong><br />
              {member.user.email}
            </p>
          </Link>
        )
      })}
    </div>
  )
}

const mapEndpointsToProps = (props) => ({
  project: `/admin/expenses/projects/${props.params.id}`,
  members: `/admin/expenses/projects/${props.params.id}/members`
})

export default Container(mapEndpointsToProps)(Show)
