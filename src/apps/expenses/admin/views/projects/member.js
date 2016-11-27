import React from 'react'
import Page from 'portals/admin/components/page'

class Member extends React.Component {

  render() {
    return (
      <Page {...this._getMain()}>
        <div className="chrome-sidebar">
          boom
        </div>
        <div className="chrome-content"></div>
      </Page>
    )
  }

  _getMain() {
    return {
      back: `/admin/expenses/projects/${this.props.params.project_id}`,
      title: 'boom',
      permissions: []
    }
  }

}

export default Member
