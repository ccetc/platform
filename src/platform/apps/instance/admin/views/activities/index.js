import React from 'react'
import Page from 'portals/admin/components/page'
import Feed from 'portals/admin/components/feed'

class Index extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <Feed {...this._getFeed()} />
      </div>
    )
  }

  _getFeed() {
    return {
      endpoint: '/admin/activities',
      state: 'next'
    }
  }

}

const mapPropsToPage = (props, context) => ({
  back: '/admin',
  title: 'Activities',
  permissions: []
})

export default Page(mapPropsToPage)(Index)
