import React from 'react'
import { Link } from 'react-router'
import Infinite from 'ui/components/infinite'
import moment from 'moment'

export class Container extends React.Component {

  static propTypes = {
    endpoint: React.PropTypes.string.isRequired,
    onChoose: React.PropTypes.func
  }

  static defaultProps = {
    onChoose: () => {}
  }

  render() {
    return (
      <Infinite {...this._getInfinite()}>
        <Feed {...this.props} />
      </Infinite>
    )
  }

  _getInfinite() {
    const { endpoint } = this.props
    return {
      endpoint
    }
  }

}

export class Feed extends React.Component {

  static propTypes = {
    loaded: React.PropTypes.number.isRequired,
    records: React.PropTypes.array.isRequired,
    status: React.PropTypes.string.isRequired,
    total: React.PropTypes.number.isRequired,
    onChoose: React.PropTypes.func
  }

  static defaultProps = {
    onChoose: () => {}
  }

  render() {
    const { records } = this.props
    if(records.length > 0) {
      return (
        <div className="chrome-feed">
          <div className="chrome-feed-items">
            {records.map((item, index) => {
              let story = item.story.text
              if(item.subject) {
                story = story.replace('{subject}', `<span class="chrome-feed-item-subject">${item.subject.text}</span>`)
              }
              if(item.object1) {
                story = story.replace('{object1}', `<span class="chrome-feed-item-object">${item.object1.text}</span>`)
              }
              if(item.object2) {
                story = story.replace('{object2}', `<span class="chrome-feed-item-object">${item.object2.text}</span>`)
              }
              let classes = ['chrome-feed-item']
              if(item.is_read !== undefined && !item.is_read) {
                classes.push('unread')
              }
              return (
                <Link key={`item_${index}`} className={classes.join(' ')} to={{ pathname: item.subject.url, state: 'static' }} onClick={this.props.onChoose}>
                  <div className="chrome-feed-item-avatar">
                    <img src={ item.user.photo } className="ui circular image" />
                  </div>
                  <div className="chrome-feed-item-details">
                    <div className="chrome-feed-item-story">
                      <span className="chrome-feed-item-user">{ item.user.full_name }</span>
                      <span dangerouslySetInnerHTML={{__html: story }} />
                    </div>
                    <div className="chrome-feed-item-timestamp">{ moment(item.created_at).fromNow() } on { moment(item.created_at).format('dddd, MMMM Do @ h:mm a') }</div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      )
    } else {
      return null
    }
  }

}

export default Container
