import React from 'react'

export default (props) => {
  return (
    <div className="expense-type-token">
      <strong>{ props.code } - { props.title }</strong><br />
      { props.description }
    </div>
  )
}
