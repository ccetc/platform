import React from 'react'
import { Link } from 'react-router'

class Confirm extends React.Component {

  render() {
    return (
      <div className="ui form">
        <p>Your password has been successfully reset!</p>
        <p><Link to='/admin/signin' className="ui fluid large button">Sign In</Link></p>
      </div>
    )
  }

}

export default Confirm
