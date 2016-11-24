import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import _ from 'lodash'
import * as actions from './actions'
import Tasks from './tasks'

export class Main extends React.Component {

  static propTypes: {
    back: React.PropTypes.string.isRequired,
    permissions: React.PropTypes.array.isRequired,
    task: React.PropTypes.object,
    tasks: React.PropTypes.string,
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
        <div className="chrome-main">
          <Helmet title={`Platform | ${title}`} />
          <div className="chrome-header">
            <div className="chrome-back">
              { back &&
                <Link to={back}>
                  <i className="left chevron icon" />
                </Link>
              }
            </div>
            <div className="chrome-title">
              {title}
            </div>
            <div className="chrome-more">
              { tasks &&
                <div onClick={ this._handleToggleTasks.bind(this) }>
                  <i className="ellipsis vertical icon" />
                </div>
              }
              { task &&
                <Link to={task.route}>
                  <i className={`${task.icon} icon`} />
                </Link>
              }
            </div>
          </div>
          <div className="chrome-body">
            {this.props.children}
          </div>
          { tasks && <Tasks tasks={ tasks } /> }
        </div>
      )
    } else  {
      return (
        <div className="chrome-main">
          <Helmet title="Platform | 403 Forbidden" />
          <div className="chrome-header">
            <div className="chrome-back"></div>
            <div className="chrome-title">Access Denied</div>
            <div className="chrome-more"></div>
          </div>
          <div className="chrome-body">
            <div className="chrome-forbidden">
              <i className="warning sign icon" />
              <p>You do not have the permission to access this content</p>
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

  _userHasPermission(user, permissions) {
    let permit = true
    permissions.map((permission) => {
      if(!_.includes(user.permissions, permission)) {
        permit = false
      }
    })
    return permit === true
  }


  _handleToggleTasks() {
    this.props.onToggleTasks()
  }

}

const mapStateToProps = (state) => ({
  user: state.session.user,
  showTasks: state.main.showTasks
})

const mapDispatchToProps = {
  onToggleTasks: actions.toggleTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
