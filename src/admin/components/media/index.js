import React from 'react'
import Media from './media'

class Index extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return (
      <a className="ui button" onClick={ this._handleOpen.bind(this) }>Media</a>
    )
  }

  _handleOpen() {
    this.context.modal.push(<Media />)
  }

}

export default Index
