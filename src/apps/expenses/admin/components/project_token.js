import React from 'react'

export default (props) => {
  return (
    <div className="projecy-token">
      <strong>{ props.code }</strong> - { props.title }
    </div>
  )
}
