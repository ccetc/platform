import React from 'react'
import Card from 'ui/components/card'
import Container from 'ui/components/container'
import Page from 'portals/admin/components/page'
import Edit from './edit'

class Show extends React.Component {

  static contextTypes = {
    flash: React.PropTypes.object
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
    const { project } = this.props
    return {
      items: [
        { label: 'Code ', content: project.code, format: 'code' }
      ]
    }
  }

}

const mapEndpointsToProps = (props) => ({
  project: `/admin/expenses/projects/${props.params.id}`
})

export default Container(mapEndpointsToProps)(Show)
