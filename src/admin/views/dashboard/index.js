import React from 'react'
import Page from 'admin/components/page'

class Dashboard extends React.Component {

  render() {
    return (
      <div className="chrome-body">
      </div>
    )
  }

}

const mapResourcesToPage = (props, context) => ({})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Dashboard'
})

export default Page(mapResourcesToPage, mapPropsToPage)(Dashboard)
