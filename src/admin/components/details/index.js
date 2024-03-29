import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Format from '../../utils/format'

class Details extends React.Component {

  static propTypes = {
    header: React.PropTypes.string,
    image: React.PropTypes.string,
    items: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        label: React.PropTypes.string,
        content: React.PropTypes.any,
        format: React.PropTypes.oneOfType([
          React.PropTypes.string,
          React.PropTypes.element,
          React.PropTypes.func
        ])
      })
    ),
    body: React.PropTypes.string,
    buttons: React.PropTypes.arrayOf(
      React.PropTypes.shape({
        label: React.PropTypes.string,
        style: React.PropTypes.string,
        route: React.PropTypes.string,
        onClick: React.PropTypes.func
      })
    )
  }

  render() {
    const { top, image, items, body, buttons } = this.props
    return (
      <div className="chrome-details">
       {(() => {
         if(top) {
           return (
             <div className="chrome-details-top">
               { top }
             </div>
           )
         }
       })()}
       {(() => {
         if(image) {
           return (
            <div className="chrome-details-image">
              <img src={ image } className="ui circular image" />
            </div>
           )
         }
       })()}
        {(() => {
          if(body) {
            return (
              <div className="chrome-details-content">
                { body }
              </div>
            )
          }
        })()}
        {(() => {
          if(items) {
            return (
              <div className="chrome-details-content">
                <div className="ui list">
                  {items.map((item, index) => {
                    if(item.content !== null || item.content === undefined) {
                      return (
                        <div key={`item_${index}`} className="item">
                          <div className="header">{item.label}</div>
                          <Format {...this.props} format={item.format} value={item.content} />
                        </div>
                      )
                    }
                  })}
                </div>
              </div>
            )
          }
        })()}
        {(() => {
          if(buttons) {
            return (
              <div className="extra content">
                <div className="ui two buttons">
                  {buttons.map((button, index) => {
                    let classes = ['ui', 'button']
                    if(button.style) {
                      classes.push(button.style)
                    }
                    return <Link key={`task_${index}`} to={button.route} className={classes.join(' ')}>{button.label}</Link>
                  })}
                </div>
              </div>
            )
          }
        })()}
      </div>
    )
  }

}

export default Details
