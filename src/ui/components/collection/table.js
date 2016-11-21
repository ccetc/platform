import React from 'react'

class Table extends React.Component {

  render() {
    const { records, total } = this.props
    return (
      <div>
        { total } records
        <div className="table">
          <div className="table-head">
            <div className="table-row">
              <div className="table-header">Name</div>
              <div className="table-header">Email</div>
            </div>
          </div>
          <div className="table-body">
            {records.map((record, index) => {
              return (
                <div className="table-row" key={`record_${index}`}>
                  <div className="table-cell">{record.full_name}</div>
                  <div className="table-cell">{record.email}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}

export default Table
