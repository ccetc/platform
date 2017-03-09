import React from 'react'
import Avatar from 'admin/components/avatar'

export default (props) => {
  return (
    <div>
      <Avatar user={ props } />
      <strong>{ props.first_name } { props.last_name }</strong><br />
      { props.email }
    </div>
  )
}
