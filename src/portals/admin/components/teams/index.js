import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Teams extends React.Component {

  static childContextTypes = {
    teams: React.PropTypes.object
  }

  static propTypes = {
    status: React.PropTypes.string,
    onChoose: React.PropTypes.func,
    onLoad: React.PropTypes.func,
    onSave: React.PropTypes.func
  }

  render() {
    const { children, status } = this.props
    return (
      <div>
        { (status === 'success') ? children : null }
      </div>
    )
  }

  componentDidMount() {
    this.props.onLoad()
  }

  componentDidUpdate(prevProps) {
    const { teams } = this.props
    if(prevProps.teams !== teams && prevProps.status !== 'pending') {
      this.props.onSave(teams)
    }
  }

  getChildContext() {
    const { add, choose, remove } = this.props
    return {
      teams: {
        add,
        choose,
        remove
      }
    }
  }

}

const mapStateToProps = state => ({
  teams: state.teams.teams,
  status: state.teams.status
})

const mapDispatchToProps = {
  add: actions.add,
  choose: actions.choose,
  remove: actions.remove,
  onLoad: actions.load,
  onSave: actions.save
}

export default connect(mapStateToProps, mapDispatchToProps)(Teams)
