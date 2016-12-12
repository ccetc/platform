import React from 'react'
import { connect } from 'react-redux'
import component from 'ui/component'
import * as actions from './actions'

class Team extends React.Component {

  static childContextTypes = {
    team: React.PropTypes.object
  }

  static propTypes = {
    status: React.PropTypes.string,
    subtitle: React.PropTypes.string,
    title: React.PropTypes.string
  }

  render() {
    const { children, status } = this.props
    return (
      <div className="chrome-team">
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
      team: {
        title,
        subtitle,
        logo
      }
    }
  }

}

const mapStateToProps = state => ({
  status: state.team.status,
  title: state.team.title,
  subtitle: state.team.subtitle,
  logo: state.team.logo
})

const mapDispatchToProps = {
  load: actions.load
}

export default component(connect(mapStateToProps, mapDispatchToProps)(Team), 'team', true)
