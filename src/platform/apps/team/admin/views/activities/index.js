import React from 'react'
import Page from 'portals/admin/containers/page'
import Collection from 'portals/admin/components/collection'
import Feed from 'portals/admin/components/feed'

class Index extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <Collection { ...this._getCollection() } />
      </div>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/activities',
      filters: [
        { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/admin/users', value: 'id', text: 'full_name', sort: { key: 'last_name', order: 'asc' } },
        { label: 'App', name: 'app_id', type: 'select', multiple: true, endpoint: '/admin/apps', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
        { label: 'Date Range', name: 'daterange', type: 'daterange', include: ['this','last'] }
      ],
      sort: { key: 'created_at', order: 'desc' },
      layout: Feed,
      entity: 'activity'
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Activities'
})

export default Page(mapPropsToPage)(Index)
