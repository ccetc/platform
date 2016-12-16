import React from 'react'
import Page from 'portals/admin/containers/page'

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
  rights: ['foo']
})

export default Page(mapPropsToPage)(Index)
