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
        container: React.PropTypes.object,
        modal: React.PropTypes.object,
        router: React.PropTypes.object,
        session: React.PropTypes.object,
        tasks: React.PropTypes.object
      }

      static propTypes = {
        data: React.PropTypes.object,
        status: React.PropTypes.string,
        user: React.PropTypes.object
      }

      page() {
        if(this.pageProps)  return this.pageProps
        this.pageProps = pageProps(this.props, this.context)
        return this.pageProps
      }

      render() {
        const { back, permissions, resources, task, tasks, title } = this.page()
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
        const { resources } = this.page()
        if(resources) {
          this.context.container.fetch(resources)
        }
      }

      _userHasPermission(user, permissions) {
        return permissions.reduce((permit, permission) => {
          return (!_.includes(user.permissions, permission)) ? false : permit
        }, true)
      }

      _handleOpenTasks() {
        const { tasks } = this.page()
        this.context.tasks.open(tasks)
      }

      _handleOpenTask() {
        const { task } = this.page()
        if(task.route) {
          this.context.router.push(task.route)
        } else if(task.component) {
          this.context.modal.open(task.component)
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