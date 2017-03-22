import React from 'react'
import Image from 'admin/components/image'

export default (props) => {
  return <ReceiptView {...props.value} />
}

class ReceiptView extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return <a onClick={ this._handleClick.bind(this) }>View Receipt</a>
  }

  _handleClick() {
    this.context.modal.push(<ReceiptModal { ...this.props } />)
  }

}

class ReceiptModal extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    return (
      <div className="chrome-modal-panel">
        <div className="chrome-modal-panel-header">
          <div className="chrome-modal-panel-header-cancel" />
          <div className="chrome-modal-panel-header-title">
            Receipt
          </div>
          <div className="chrome-modal-panel-header-proceed" onClick={ this._handleClose.bind(this) }>
            Done
          </div>
        </div>
        <div className="chrome-modal-panel-body receipt">
          <Image src={ this.props.path } title={ this.props.original_filename } transforms={{ w: 768 }} />
        </div>
      </div>
    )
  }

  _handleClose() {
    this.context.modal.pop()
  }

}
