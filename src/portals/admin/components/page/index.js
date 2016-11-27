import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import _ from 'lodash'
import Task from './task'
import Tasks from './tasks'

export class Page extends React.Component {

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
              { tasks && <Tasks tasks={ tasks } /> }
              { task && <Task {...task} /> }
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

  _userHasPermission(user, permissions) {
    let permit = true
    permissions.map((permission) => {
      if(!_.includes(user.permissions, permission)) {
        permit = false
      }
    })
    return permit === true
  }

}

const mapStateToProps = (state) => ({
  user: state.session.user
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Page)
