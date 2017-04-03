import React from 'react'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'
import Feed from 'admin/components/feed/activity'
import AppToken from '../../components/app_token'
import UserToken from '../../components/user_token'

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
      endpoint: '/admin/team/activities',
      filters: [
        { label: 'User', name: 'user_id', type: 'select', multiple: true, endpoint: '/admin/team/users', value: 'id', text: 'full_name', format: UserToken },
        { label: 'App', name: 'app_id', type: 'select', multiple: true, endpoint: '/admin/team/apps', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' }, format: AppToken },
        { label: 'Date Range', name: 'created_at', type: 'daterange', include: ['this','last'] }
      ],
      sort: { key: 'created_at', order: 'desc' },
      layout: Feed,
      entity: 'activity'
    }
  }

}

const mapResourcesToPage = (props, context) => ({})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Activities',
  rights: ['team.manage_people']
})

export default Page(mapResourcesToPage, mapPropsToPage)(Index)
