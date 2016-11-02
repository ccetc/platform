import React from 'react'
import { Link } from 'react-router'
import Session from '../components/session'

class Signin extends React.Component {

  static contextTypes = {
    history: React.PropTypes.object
  }

  render() {
    return (
      <div className="platform-session">
        <div className="ui segments">
          <div className="ui segment">
            <Session />
          </div>
        </div>
      </div>
    )
  }

}

export default Signin
