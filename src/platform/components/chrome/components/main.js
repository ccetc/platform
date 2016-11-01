import React from 'react'
import { Link } from 'react-router'
import Helmet from 'react-helmet'

export class Main extends React.Component {

  static propTypes: {
    title: React.PropTypes.string.isRequired,
    breadcrumbs: React.PropTypes.array.isRequired
  }

  render() {
    const { breadcrumbs, title } = this.props
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
  }

}

export default Main
