import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import _ from 'lodash'

export class Page extends React.Component {

  static childContextTypes = {
    page: React.PropTypes.object
  }

  static contextTypes = {
    chrome: React.PropTypes.object
  }

  static propTypes = {
    back: React.PropTypes.string.isRequired,
    permissions: React.PropTypes.array,
    task: React.PropTypes.object,
    tasks: React.PropTypes.array,
    title: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      permitted: true
    }
  }

  render() {
    const { back, task, tasks, title } = this.props
    const { permitted } = this.state
    if(permitted) {
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
          <div className="chrome-body">
            {this.props.children}
          </div>
        </div>
      )
    } else  {
      return (
        <div className="chrome-page">
          <Helmet title="Platform | 403 Forbidden" />
          <div className="chrome-header">
            <div className="chrome-back"></div>
            <div className="chrome-title">Access Denied!</div>
            <div className="chrome-more"></div>
          </div>
          <div className="chrome-body">
            <div className="chrome-forbidden">
              <i className="warning sign icon" />
              <p>You do not have permission to access this content</p>
            </div>
          </div>
        </div>
      )
    }
  }

  componentDidMount() {
    const { user, permissions } = this.props
    if(permissions) {
      if(!this._userHasPermission(user, permissions)) {
        this.setState({
          permitted: false
        })
      }
    }
  }

  getChildContext() {
    return {
      page: {
        openModal: this._handleOpenModal.bind(this)
      }
    }
  }

  _userHasPermission(user, permissions) {
    let permit = true
    permissions.map((permission) => {
      if(!_.includes(user.permissions, permission)) {
        permit = false
      }
    })
    return permit === true
  }

  _handleOpenModal() {
    this.props.onOpenModal()
  }

  _handleOpenTasks() {
    this.context.chrome.openTasks(this.props.tasks)
  }

  _handleOpenTask() {
    const { route, component } = this.props.task
    if(route) {
      this.context.chrome.transitionTo(route)
    } else if(component) {
      this.context.chrome.openModal(component)
    }
  }

}

const mapStateToProps = (state) => ({
  user: state.session.user
})

export default connect(mapStateToProps)(Page)
