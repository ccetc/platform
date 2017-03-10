import React from 'react'

export default (props) => {
  return (
    <div className="app-token">
      <div className="app-icon">
        <i className={`${props.icon} icon`} />
      </div>
      { props.title }
    </div>
  )
}
