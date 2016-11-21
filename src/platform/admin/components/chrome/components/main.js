import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import _ from 'lodash'

export class Main extends React.Component {

  static propTypes: {
    breadcrumbs: React.PropTypes.array.isRequired,
    permissions: React.PropTypes.array.isRequired,
    title: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      permitted: true
    }
  }

  render() {
    const { breadcrumbs, title } = this.props
    if(this.state.permitted) {
      return (
        <div className="chrome-main">
          <Helmet title={`Platform | ${title}`} />
          <div className="chrome-header">
            <div className="ui breadcrumb">
              {breadcrumbs.map((breadcrumb, index) => {
                if(breadcrumb.route) {
                  return (
                    <span key={`breadcrumb_${index}`}>
                      <Link to={breadcrumb.route} className="section">{breadcrumb.label}</Link>
                      <div className="divider"> / </div>
                    </span>
                  )
                } else {
                  return (
                    <span key={`breadcrumb_${index}`}>
                      <div className="active section">{breadcrumb.label}</div>
                    </span>
                  )
                }
              })}
            </div>
          </div>
          <div className="chrome-body">
            <div className="chrome-content">
              {this.props.children}
            </div>
          </div>
        </div>
      )
    } else  {
      return (
        <div className="chrome-main">
          <Helmet title="Platform | 403 Forbidden" />
          <div className="chrome-header">
            <div className="ui breadcrumb">
              <a className="section" href="/admin">Dashboard</a> <div className="divider"> / </div>
              <div className="active section">403 Forbidden</div>
            </div>
          </div>
          <div className="chrome-body">
            <div className="chrome-content">
              <div className="chrome-forbidden">
                <i className="warning sign icon" />
                <p>You do not have the permission to access this content</p>
              </div>
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
  user: state.user
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
