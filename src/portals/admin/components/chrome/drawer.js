import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

class Drawer extends React.Component {

  static contextTypes = {
    chrome: React.PropTypes.object
  }

  render() {
    const { drawer } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500}>
        { drawer && <div className="chrome-drawer-overlay" onClick={this._handleCloseDrawer.bind(this)} /> }
        { drawer &&
          <div className={`chrome-drawer chrome-drawer-${drawer.location}`}>
            { React.createElement(drawer.component) }
          </div>
        }
      </Transition>
    )
  }

  _handleCloseDrawer() {
    this.context.chrome.closeDrawer()
  }

}

const mapStateToProps = (state) => ({
  drawer: state.chrome.drawer
})

export default connect(mapStateToProps)(Drawer)
