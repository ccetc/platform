import React from 'react'
import Page from 'portals/admin/components/page'

class Index extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        Apps
      </div>
    )
  }

}

const mapPropsToPage = (props, context) => ({
  back: '/admin',
  title: 'Apps',
  permissions: ['foo']
})

export default Page(mapPropsToPage)(Index)
