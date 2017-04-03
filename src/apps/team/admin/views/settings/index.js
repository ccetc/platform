import React from 'react'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'
import Edit from './edit'
import AppToken from '../../components/app_token'

class Index extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <Collection {...this._getCollection()} />
      </div>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/team/apps',
      columns: [
        { label: 'Title', key: 'title', primary: true, format: AppToken }
      ],
      entity: 'app',
      modal: Edit,
      sort: { key: 'title', order: 'asc' }
    }
  }

}

const mapResourcesToPage = (props, context) => ({})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Settings',
  rights: ['team.manage_apps']
})

export default Page(mapResourcesToPage, mapPropsToPage)(Index)
