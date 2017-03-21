import React from 'react'
import Avatar from 'admin/components/avatar'

export default (props) => {
  return (
    <div className="user-token">
      <Avatar user={ props } width="40" />
      <strong>{ props.first_name } { props.last_name }</strong><br />
      { props.email }
    </div>
  )
}
