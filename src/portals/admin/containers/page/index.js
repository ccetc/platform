import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { getActiveTeam, getActiveUser } from '../admin/selectors'
import Helmet from 'react-helmet'
import Forbidden from './forbidden'
import _ from 'lodash'

export default (pageProps) => {

  return (BodyComponent) => {

    class Page extends React.Component {

      static contextTypes = {
        container: React.PropTypes.object,
        flash: React.PropTypes.object,
        modal: React.PropTypes.object,
        router: React.PropTypes.object,
        session: React.PropTypes.object,
        tasks: React.PropTypes.object
      }

      static propTypes = {
        data: React.PropTypes.object,
        status: React.PropTypes.string,
        team: React.PropTypes.object,
        user: React.PropTypes.object
      }

      page() {
        if(this.pageProps)  return this.pageProps
        this.pageProps = pageProps(this.props, this.context)
        return this.pageProps
      }

      render() {
        const { back, rights, resources, task, tasks, title } = this.page()
        const { data, status, team, user } = this.props
        if(rights && !this._userHasRight(user, rights)) {
          return <Forbidden />
        }
        const loaded = !resources || _.isEqual(Object.keys(data).sort(), Object.keys(resources).sort())
        return (
          <div className="chrome-page">
            <Helmet title={`${team.title} | ${title}`} />
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
            { resources && status === 'loading' &&
              <div className="chrome-loader">
                <div className="ui active inverted dimmer">
                  <div className="ui large text loader">Loading</div>
                </div>
              </div>
            }
            { resources && status === 'failure' &&
              <div className="chrome-error">
                <div className="chrome-error-message">
                  <i className="warning sign icon" />
                  <h2>Unable to load<br /> this page</h2>
                  <Link className="ui basic red button" onClick={this._refreshResources.bind(this)}>Try again</Link>
                </div>
              </div>
            }
            { loaded && <BodyComponent {...this.props} {...data} /> }
          </div>
        )
      }

      componentDidMount() {
        const { resources } = this.page()
        if(resources) {
          this.context.container.fetch(resources)
        }
      }

      _refreshResources() {
        const { resources } = this.page()
        if(resources) {
          const props = Object.keys(resources)
          this.context.container.refresh(props)
        }
      }

      componentWillUnmount() {
        const { resources } = this.page()
        if(resources) {
          const keys = Object.keys(resources)
          this.context.container.clear(keys)
        }
      }

      _userHasRight(user, rights) {
        return rights.reduce((permit, right) => {
          return (!_.includes(user.rights, right)) ? false : permit
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
      team: getActiveTeam(state),
      user: getActiveUser(state),
      ...state.container
    })

    return connect(mapStateToProps)(Page)

  }

}
