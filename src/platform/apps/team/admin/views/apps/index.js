import React from 'react'
import { Link } from 'react-router'
import Page from 'portals/admin/containers/page'

class Index extends React.Component {

  render() {
    const { apps } = this.props
    return (
      <div className="chrome-body">
        <div className="apps">
          { Object.keys(apps).map(key => {
            const app = apps[key]
            return (
              <div className={`app ${app.installed && 'installed'}`}>
                <div className="app-icon">
                  <i className={`${app.icon} icon`} />
                </div>
                <div className="app-content">
                  <h2>{ app.title }</h2>
                  <h4>{ app.author }</h4>
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
  title: 'Apps',
  resources: {
    apps: '/admin/apps'
  }
})

export default Page(mapPropsToPage)(Index)
