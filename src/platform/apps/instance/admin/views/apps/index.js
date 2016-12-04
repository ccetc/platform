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

const details = props => ({
  back: '/admin',
  title: 'Apps',
  permissions: ['foo']
})

export default Page(details)(Index)
