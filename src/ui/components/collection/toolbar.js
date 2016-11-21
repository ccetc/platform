import React from 'react'

class Table extends React.Component {

  render() {
    const { total } = this.props
    return (
      <div className="collection-toolbar">
        { total } records
      </div>
    )
  }

}

export default Table
