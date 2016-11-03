import React from 'react'
import { Link } from 'react-router'
import Form from '../components/session'

class Signin extends React.Component {

  static contextTypes = {
    history: React.PropTypes.object
  }

  render() {
    return (
      <div className="chrome-session">
        <div className="chrome-signin">
          <h1>MyCCE</h1>
          <h3>Cornell Cooperative Extension of Tompkins County</h3>
          <Form />
        </div>
      </div>
    )
  }

}

export default Signin
