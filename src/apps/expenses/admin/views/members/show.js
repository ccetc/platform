import React from 'react'
import Card from 'ui/components/card'
import Container from 'ui/components/container'
import Page from 'portals/admin/components/page'

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
    return {
      back: `/admin/projects/${this.props.params.project_id}`,
      title: 'Member',
      permissions: [],
      tasks: [
        { label: 'Remove Member' }
      ]
    }
  }

  _getCard() {
    const { member } = this.props
    return {
      image: member.photo,
      items: [
        { label: 'Name ', content: member.full_name },
        { label: 'Email ', content: member.email, format: 'email' }
      ]
    }
  }

}

const mapEndpointsToProps = (props) => ({
  member: `/admin/instance/projects/${props.params.project_id}/members/${props.params.id}`
})

export default Container(mapEndpointsToProps)(Show)
