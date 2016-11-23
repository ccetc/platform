import React from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import Helmet from 'react-helmet'
import _ from 'lodash'

export class Main extends React.Component {

  static propTypes: {
    back: React.PropTypes.string.isRequired,
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
    const { back, title } = this.props
    if(this.state.permitted) {
      return (
        <div className="chrome-main">
          <Helmet title={`Platform | ${title}`} />
          <div className="chrome-header">
            <div className="chrome-back">
              <Link to={back}>
                <i className="left chevron icon" />
              </Link>
            </div>
            <div className="chrome-title">
              {title}
            </div>
            <div className="chrome-spacer">
            </div>
          </div>
          <div className="chrome-body">
            {this.props.children}
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

}

const mapStateToProps = (state) => ({
  user: state.session.user
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
