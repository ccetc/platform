import React from 'react'
import { Link } from 'react-router'
import moment from 'moment'

export class Feed extends React.Component {

  static propTypes = {
    items: React.PropTypes.array.isRequired,
    onChoose: React.PropTypes.func
  }

  static defaultProps = {
    onChoose: () => {}
  }

  render() {
    const { items } = this.props
    return (
      <div className="chrome-feed">
        {items.map((item, index) => {
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
    )
  }


}

export default Feed
