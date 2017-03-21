import React from 'react'
import Image from '../image'

export class Logo extends React.Component {

  static propTypes = {
    team: React.PropTypes.object,
    width: React.PropTypes.string
  }

  static defaultProps = {
    width: 150
  }

  render() {
    const { team, width } = this.props
    return (
      <div className="logo">
        <div className="logo-badge">
          <div className="logo-wrapper">
            { team.logo && <Image src={team.logo} title={team.title} transforms={{ fit: 'cover', w: width, h: width }} /> }
            { !team.logo && <div className="logo-text">{ team.title[0] }</div> }
          </div>
        </div>
      </div>
    )
  }

}

export default Logo
