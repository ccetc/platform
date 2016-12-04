import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import Forbidden from './forbidden'
import _ from 'lodash'

export default (pageProps) => {

  return (BodyComponent) => {

    class Page extends React.Component {

      static contextTypes = {
        chrome: React.PropTypes.object,
        container: React.PropTypes.object
      }

      static propTypes = {
        data: React.PropTypes.object,
        status: React.PropTypes.string,
        user: React.PropTypes.object
      }

      constructor(props) {
        super(props)
        this.page = pageProps(props)
      }

      render() {
        const { back, permissions, resources, task, tasks, title } = this.page
        const { data, status, user } = this.props
        if(permissions && !this._userHasPermission(user, permissions)) {
          return <Forbidden />
        }
        return (
          <div className="chrome-page">
            <Helmet title={`Platform | ${title}`} />
            <div className="chrome-header">
              <div className="chrome-back">
                { back &&
                  <Link to={{ pathname: back, state: 'back' }}>
                    <i className="left chevron icon" />
                  </Link>
                }
              </div>
              <div className="chrome-title">
                {title}
              </div>
              <div className="chrome-more">
                { tasks &&
                  <div className="chrome-tasks">
                    <a onClick={ this._handleOpenTasks.bind(this) }>
                      <i className="ellipsis vertical icon" />
                    </a>
                  </div>
                }
                { task &&
                  <div className="chrome-task">
                    <a onClick={this._handleOpenTask.bind(this)}>
                      <i className={`${task.icon} icon`} />
                    </a>
                  </div>
                }
              </div>
            </div>
            { resources && status === 'loading' && <p>Loading...</p> }
            { resources && status === 'failure' && <p>Unable to load</p> }
            { resources && !_.includes(['loading','failed','uninitialized'], status) && <BodyComponent {...this.props} {...data} /> }
            { !resources && <BodyComponent {...this.props} /> }
          </div>
        )
      }

      componentDidMount() {
        if(this.page.resources) {
          this.context.container.fetch(this.page.resources)
        }
      }

      _userHasPermission(user, permissions) {
        return permissions.reduce((permit, permission) => {
          return (!_.includes(user.permissions, permission)) ? false : permit
        }, true)
      }

      _handleOpenTasks() {
        this.context.chrome.openTasks(this.page.tasks)
      }

      _handleOpenTask() {
        const { route, component } = this.page.task
        if(route) {
          this.context.chrome.transitionTo(route)
        } else if(component) {
          this.context.chrome.openModal(component)
        }
      }

    }

    const mapStateToProps = state => ({
      user: state.session.user,
      ...state.container
    })

    return connect(mapStateToProps)(Page)

  }

}
