import React from 'react'

class Filter extends React.Component {


  render() {
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
          <div className="filter-header-next">
            Done
          </div>
        </div>
        <div className="filter-body">
          <div className="filter-item">
            Item 1
            <i className="chevron right icon" />
          </div>
          <div className="filter-item">
            Item 2
            <i className="chevron right icon" />
          </div>
          <div className="filter-item">
            Item 3
            <i className="chevron right icon" />
          </div>
          <div className="filter-item">
            Item 4
            <i className="chevron right icon" />
          </div>
          <div className="filter-item">
            Item 5
            <i className="chevron right icon" />
          </div>
          <div className="filter-item">
            Item 6
            <i className="chevron right icon" />
          </div>
          <div className="filter-item">
            Item 7
            <i className="chevron right icon" />
          </div>
        </div>
        <div className="filter-footer">
          Reset Filter
        </div>
      </div>
    )
  }

}

export default Filter
