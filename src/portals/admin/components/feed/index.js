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
    loaded: React.PropTypes.number,
    records: React.PropTypes.array,
    status: React.PropTypes.string,
    total: React.PropTypes.number,
    onChoose: React.PropTypes.func
  }

  static defaultProps = {
    onChoose: () => {}
  }

  render() {
    const { records, status } = this.props
    if(records.length > 0) {
      return (
        <div className="chrome-feed">
          <div className="chrome-feed-items">
            {records.map((item, index) => {
              let story = item.story.text
              if(item.subject_text) {
                story = story.replace('{subject}', `the ${item.subject_type} <span class="chrome-feed-item-subject">${item.subject_text}</span>`)
              }
              if(item.object1_text) {
                story = story.replace('{object1}', `the ${item.object1_type} <span class="chrome-feed-item-object">${item.object1_text}</span>`)
              }
              if(item.object2_text) {
                story = story.replace('{object2}', `the ${item.object2_type} <span class="chrome-feed-item-object">${item.object2_text}</span>`)
              }
              let classes = ['chrome-feed-item']
              if(item.is_read !== undefined && !item.is_read) {
                classes.push('unread')
              }
              return (
                <Link key={`item_${index}`} className={classes.join(' ')} to={{ pathname: item.url, state: 'static' }} onClick={this.props.onChoose}>
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
            { status === 'loading' && <div className="loading">Loading...</div> }
          </div>
        </div>
      )
    } else if(status === 'completed' && records.length === 0) {
      return <div>nada</div>
    } else {
      return null
    }
  }

}

export default Container
