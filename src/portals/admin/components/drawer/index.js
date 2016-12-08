import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import component from 'ui/component'
import * as actions from './actions'

class Drawer extends React.Component {

  static childContextTypes = {
    drawer: React.PropTypes.object
  }

  static contextTypes = {
    cordova: React.PropTypes.object
  }

  static propTypes = {
    drawer: React.PropTypes.object,
    open: React.PropTypes.func,
    close: React.PropTypes.func
  }

  render() {
    const { children, drawer } = this.props
    return (
      <div>
        { children }
        <CSSTransitionGroup transitionName="expanded" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500}>
          { drawer && <div className="chrome-drawer-overlay" onClick={this._handleCloseDrawer.bind(this)} /> }
          { drawer &&
            <div className={`chrome-drawer chrome-drawer-${drawer.location}`}>
              { React.createElement(drawer.component) }
            </div>
          }
        </CSSTransitionGroup>
      </div>
    )
  }

  getChildContext() {
    return {
      drawer: {
        open: this._handleOpenDrawer.bind(this),
        close: this._handleCloseDrawer.bind(this)
      }
    }
  }

  _handleOpenDrawer(component, location) {
    this.context.cordova.hideStatusBar()
    this.props.open(component, location)
  }

  _handleCloseDrawer() {
    this.context.cordova.showStatusBar()
    this.props.close()
  }

}

const mapStateToProps = state => ({
  drawer: state.drawer
})

const mapDispatchToProps = {
  open: actions.open,
  close: actions.close
}

export default component(connect(mapStateToProps, mapDispatchToProps)(Drawer), 'drawer', true)
