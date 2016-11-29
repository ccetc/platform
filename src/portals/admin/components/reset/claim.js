import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Claim extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  render() {
    return null
  }

  componentDidMount() {
    this.props.onSetToken(this.props.params.id)
  }

  componentDidUpdate(prevProps) {
    const { status, token } = this.props
    if(prevProps.status != status) {
      if(status === 'initialized') {
        this.props.onClaim(token)
      } else if(status == 'claimed') {
        this.context.router.push('/admin/reset/security')
      }
    }
  }

}

const mapStateToProps = state => state.reset

const mapDispatchToProps = {
  onSetToken: actions.setToken,
  onClaim: actions.claim
}

export default connect(mapStateToProps, mapDispatchToProps)(Claim)
