import React from 'react'
import { connect } from 'react-redux'
import component from 'ui/component'
import * as actions from './actions'

class Electron extends React.Component {

  static childContextTypes = {
    electron: React.PropTypes.object
  }

  static propTypes = {
    enabled: React.PropTypes.bool.isRequired
  }

  render() {
    const { children, enabled } = this.props
    return (
      <div className={ enabled ? 'electron' : null }>
        { children }
      </div>
    )
  }

  componentDidMount() {
    if(this.props.location.query.electron) {
      this.props.onEnable()
    }
  }

  getChildContext() {
    return {
      electron: {
      }
    }
  }

}

const mapStateToProps = state => ({
  enabled: state.electron.enabled
})

const mapDispatchToProps = {
  onEnable: actions.enable
}

export default component(connect(mapStateToProps, mapDispatchToProps)(Electron), 'electron', true)
