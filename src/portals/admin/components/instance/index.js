import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Instance extends React.Component {

  static childContextTypes = {
    instance: React.PropTypes.object
  }

  static propTypes = {
    status: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    title: React.PropTypes.string
  }

  render() {
    const { children, status } = this.props
    return (
      <div className="chrome-instance">
        { status === 'success' ? children : null }
      </div>
    )
  }

  componentDidMount() {
    this.props.load()
  }

  getChildContext() {
    const { title, subtitle, logo } = this.props
    return {
      instance: {
        title,
        subtitle,
        logo
      }
    }
  }

}

const mapStateToProps = state => ({
  status: state.instance.status,
  title: state.instance.title,
  subtitle: state.instance.subtitle,
  logo: state.instance.logo
})

const mapDispatchToProps = {
  load: actions.load
}

export default connect(mapStateToProps, mapDispatchToProps)(Instance)
