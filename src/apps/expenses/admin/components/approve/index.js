import React from 'react'
import pluralize from 'pluralize'
import { connect } from 'react-redux'
import * as actions from './actions'
import Reject from './reject'

class Approve extends React.Component {

  static contextTypes = {
    container: React.PropTypes.object,
    flash: React.PropTypes.object,
    modal: React.PropTypes.object
  }

  render() {
    return (
      <div className="ui fluid buttons">
        <button className="ui red button" onClick={ this._handleReject.bind(this) }>Reject</button>
        <div className="or"></div>
        <button className="ui green button" onClick={ this._handleApprove.bind(this) }>Approve</button>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { status, type } = this.props
    if(prevProps.status !== status) {
      this.context.container.refresh(type)
      this.context.flash.set('success', `This ${type} was successfully ${status}`)
    }
  }

  _handleApprove() {
    const { id, onApprove } = this.props
    const type = pluralize(this.props.type)
    onApprove(type, id)
  }

  _handleReject() {
    const { id, onReject } = this.props
    const type = pluralize(this.props.type)
    const props = {
      type: this.props.type,
      id: this.props.id,
      onSuccess: () => {
        onReject(type, id)
      }
    }
    this.context.modal.push(<Reject {...props} />)
  }

}

const mapStateToProps = state => ({
  status: state.expenses.approve.status
})

const mapDispatchToProps = {
  onApprove: actions.approve,
  onReject: actions.reject
}

export default connect(mapStateToProps, mapDispatchToProps)(Approve)
