import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import component from 'ui/component'
import * as actions from './actions'

class Drawer extends React.Component {

  static childContextTypes = {
    drawer: React.PropTypes.object
  }

  static propTypes = {

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
    const { open, close } = this.props
    return {
      drawer: {
        open,
        close
      }
    }
  }

  _handleCloseDrawer() {
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
