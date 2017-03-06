import React from 'react'
import moment from 'moment'

export class Feed extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object,
    history: React.PropTypes.object
  }

  static propTypes = {
    loaded: React.PropTypes.number,
    records: React.PropTypes.array,
    state: React.PropTypes.string,
    status: React.PropTypes.string,
    total: React.PropTypes.number,
    onChoose: React.PropTypes.func
  }

  static defaultProps = {
    onChoose: () => {}
  }

  render() {
    const { records, status, state } = this.props
    if(records.length > 0) {
      return (
        <div className="chrome-feed">
          <div className="chrome-feed-items">
            { records.map((item, index) => {
              let story = `<span class="chrome-feed-item-subject">${item.subject.full_name}</span> ${item.story.text}`
              if(item.object1) {
                story = story.replace('{object1}', `${item.object1.description} <span class="chrome-feed-item-object">${item.object1.text}</span>`)
              }
              if(item.object2) {
                story = story.replace('{object2}', `${item.object2.description} <span class="chrome-feed-item-object">${item.object2.text}</span>`)
              }
              let classes = ['chrome-feed-item']
              if(item.is_read !== undefined && !item.is_read) {
                classes.push('unread')
              }
              return (
                <a key={`item_${index}`} className={classes.join(' ')} onClick={this._onClick.bind(this, item.object1.url)}>
                  <div className="chrome-feed-item-avatar">
                    <img src={ item.subject.photo } className="ui circular image" />
                  </div>
                  <div className="chrome-feed-item-details">
                    <div className="chrome-feed-item-story">
                      <span dangerouslySetInnerHTML={{__html: story }} />
                    </div>
                    <div className="chrome-feed-item-timestamp">
                      <div className="chrome-feed-item-app-icon">
                        <i className={`${ item.app.icon } icon`} />
                      </div>
                      { moment(item.created_at).calendar(null, { sameDay: '[Today]', lastDay: '[Yesterday]', sameElse: 'MMMM Do' }) } at { moment(item.created_at).format('h:mm a') }
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
          { status === 'loading' &&
            <div className="chrome-infinite-loader">
              <div className="ui active inverted dimmer">
                <div className="ui small loader"></div>
              </div>
            </div>
          }
        </div>
      )
    } else if(status === 'completed' && records.length === 0) {
      return <div>nada</div>
    } else if(status === 'loading') {
      return (
        <div className="chrome-loader">
          <div className="ui active inverted dimmer">
            <div className="ui large text loader">Loading</div>
          </div>
        </div>
      )
    } else {
      return null
    }
  }

  _onClick(url) {
    this.context.modal.pop()
    this.context.history.push({ pathname: url, state: 'static' })
  }

}

export default Feed
