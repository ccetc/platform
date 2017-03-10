import React from 'react'

export class Avatar extends React.Component {

  static propTypes = {
    user: React.PropTypes.object
  }

  render() {
    const { user } = this.props
    return (
      <div className="avatar">
        <div className="avatar-badge">
          <div className="avatar-wrapper">
            { user.photo && <img src={user.photo} /> }
            { !user.photo && <div className="avatar-text">{ user.initials }</div> }
          </div>
        </div>
      </div>
    )
  }

}

export default Avatar
