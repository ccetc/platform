import React from 'react'
import Page from 'portals/admin/components/page'

class Dashboard extends React.Component {

  render() {
    return (
      <div className="chrome-body">
      </div>
    )
  }

}

const details = props => ({
  title: 'Dashboard'
})

export default Page(details)(Dashboard)
