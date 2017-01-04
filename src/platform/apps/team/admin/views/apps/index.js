import React from 'react'
import { Link } from 'react-router'
import Page from 'portals/admin/containers/page'
import Collection from 'portals/admin/components/collection'

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
      endpoint: '/admin/apps',
      filters: [
        { label: 'Author', name: 'app_author_id', type: 'select', multiple: true, endpoint: '/admin/apps/authors', value: 'id', text: 'name' },
        { label: 'Category', name: 'app_category_id', type: 'select', multiple: true, endpoint: '/admin/apps/categories', value: 'id', text: 'title' }
      ],
      sort: { key: 'created_at', order: 'desc' },
      layout: Apps,
      entity: 'app'
    }
  }

}

class Apps extends React.Component {

  static propTypes = {
    records: React.PropTypes.array,
    status: React.PropTypes.string
  }

  render() {
    const { records } = this.props
    return (
      <div className="chrome-body">
        <div className="apps">
          { records.map(app => {
            return (
              <div className={`app ${app.installed && 'installed'}`}>
                <div className="app-icon">
                  <i className={`${app.icon} icon`} />
                </div>
                <div className="app-content">
                  <h2>{ app.title }</h2>
                  <h4>by { app.author }</h4>
                  <p>{ app.short_description }</p>
                  <Link to={{ pathname: `/admin/team/apps/${app.id}`, state: 'next' }} className="ui small fluid button">More <i className="right chevron icon" /></Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Apps'
})

export default Page(mapPropsToPage)(Index)
