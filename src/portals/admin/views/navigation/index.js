import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { getApps } from '../../containers/admin/selectors'
import { connect } from 'react-redux'
import Panel from './panel'

export class Navigation extends React.Component {

  static propTypes = {
    path: React.PropTypes.array,
    state: React.PropTypes.string
  }

  render() {
    const { apps, path, state } = this.props
    return (
      <div className="chrome-navigation">
        <ReactCSSTransitionGroup transitionName={ state } component='div' transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
          <Panel key={`navigation-${path.join('-')}`} items={ apps } />
        </ReactCSSTransitionGroup>
      </div>
    )
  }

}

const mapStateToProps = state => ({
  apps: getApps(state),
  path: state.navigation.path,
  state: state.navigation.state
})

export default connect(mapStateToProps)(Navigation)
