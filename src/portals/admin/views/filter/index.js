import React from 'react'

class Filter extends React.Component {

  static contextTypes = {
    tray: React.PropTypes.object
  }

  render() {
    const fields = [
      { label: 'Item 1' },
      { label: 'Item 2' },
      { label: 'Item 3' },
      { label: 'Item 4' },
      { label: 'Item 5' },
      { label: 'Item 6' },
      { label: 'Item 7' },
      { label: 'Item 8' },
      { label: 'Item 9' }
    ]
    return (
      <div className="filter">
        <div className="filter-header">
          <div className="filter-header-back">
            <i className="chevron left icon" />
            All Filters
          </div>
          <div className="filter-header-title">
            All Filters
          </div>
          <div className="filter-header-next" onClick={ this._handleDone.bind(this) }>
            Done
          </div>
        </div>
        <div className="filter-body">
          { fields.map((field, index) => {
            return (
              <div key={`field_${index}`} className="filter-item" onClick={ this._handleChoose.bind(this, index) }>
                {field.label}
                <i className="chevron right icon" />
              </div>
            )
          }) }
        </div>
        <div className="filter-footer" onClick={ this._handleReset.bind(this) }>
          Reset Filter
        </div>
      </div>
    )
  }

  _handleDone() {
    this.context.tray.close()
  }

  _handleReset() {
    console.log('reset')
  }

  _handleChoose(index) {
    console.log('choose', index)
  }

}

export default Filter
