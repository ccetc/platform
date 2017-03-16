import React from 'react'

export const ApprovalBadge = props => {
  if(props.is_approved === true) return <span className="approved">APPROVED</span>
  if(props.is_approved === false) return <span className="rejected">REJECTED</span>
  if(props.is_submitted && props.is_approved === null) return <span className="unreviewed">UNREVIEWED</span>
  return <span className="pending">PENDING</span>
}

export const ApprovalAlert = props => {
  if(props.is_approved === true) return <div className="ui center aligned green inverted segment">This expense has been approved</div>
  if(props.is_approved === false) return <div className="ui center aligned red inverted segment">This expense has been rejected</div>
  if(props.is_submitted && props.is_approved === null) return <div className="ui center aligned blue inverted segment">This expense is pending review</div>
  return <div className="ui center aligned grey inverted segment">This expense has not yet been submitted</div>
}
