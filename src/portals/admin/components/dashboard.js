import React from 'react'
import Page from 'portals/admin/components/chrome/page'

class Dashboard extends React.Component {

  render() {
    return (
      <div className="chrome-body">
      </div>
    )
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Dashboard'
})

export default Page(mapPropsToPage)(Dashboard)
