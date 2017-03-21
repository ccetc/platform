import React from 'react'
import Image from '../image'

export class Avatar extends React.Component {

  static propTypes = {
    user: React.PropTypes.object,
    width: React.PropTypes.string
  }

  static defaultProps = {
    width: 150
  }

  render() {
    const { width, user } = this.props
    return (
      <div className="avatar">
        <div className="avatar-badge">
          <div className="avatar-wrapper">
            { user.photo && <Image src={user.photo} title={user.full_name} transforms={{ fit: 'cover', w: width, h: width }} /> }
            { !user.photo && <div className="avatar-text">{ user.initials }</div> }
          </div>
        </div>
      </div>
    )
  }

}

export default Avatar
