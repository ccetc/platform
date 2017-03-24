import React from 'react'

export default (props) => {
  return (
    <div className="competency-token">
      <strong>{ props.title }</strong><br />
      { props.description }
    </div>
  )
}
