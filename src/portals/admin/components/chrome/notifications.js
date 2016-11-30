import React from 'react'
import { connect } from 'react-redux'

export class Notifications extends React.Component {

  static contextTypes = {
    chrome: React.PropTypes.object
  }

  static propTypes = {
  }

  render() {
    return (
      <div className="chrome-notifications-panel">
        <div className="chrome-notifications-header">

        </div>
        <div className="chrome-notifications-body">

        </div>
      </div>
    )
  }

}

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Notifications)
