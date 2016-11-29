import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'

class Claim extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  render() {
    const { status } = this.props
    return (
      <div className="ui form">
        {status === 'initialized' &&
          <div>
            <div className="ui active centered inline loader"></div>
            <p>Fetching your account...</p>
          </div>
        }
      </div>
    )
  }

  componentDidMount() {
    this.props.onSetToken(this.props.params.id)
  }

  componentDidUpdate(prevProps) {
    const { status, token, onClaim } = this.props
    if(prevProps.status != status) {
      if(status === 'initialized') {
        window.setTimeout(function() {
          onClaim(token)
        }, 1500)
      } else if(status == 'failed') {
        this.context.router.push('/admin/forgot')
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
