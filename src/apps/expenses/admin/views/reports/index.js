import React from 'react'
import Page from 'portals/admin/components/chrome/page'

class Reports extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <div>Reports</div>
      </div>
    )
  }

}

const mapPropsToPage = (props, context) => ({
  back: '/admin',
  title: 'Reports'
})

export default Page(mapPropsToPage)(Reports)
