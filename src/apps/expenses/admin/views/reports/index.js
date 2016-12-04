import React from 'react'
import Page from 'portals/admin/components/page'

class Reports extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <div>Reports</div>
      </div>
    )
  }

}

const details = props => ({
  back: '/admin',
  title: 'Reports'
})

export default Page(details)(Reports)
