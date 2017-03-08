import React from 'react'

export default (props) => {
  return (
    <div>
      <strong>{ props.code } - { props.title }</strong><br />
      { props.description }
    </div>
  )
}
