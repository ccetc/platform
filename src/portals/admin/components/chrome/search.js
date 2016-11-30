import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import * as actions from './actions'

export class Search extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes: {
    active: React.PropTypes.bool.isRequired,
    choice: React.PropTypes.number,
    query: React.PropTypes.string.isRequired,
    results: React.PropTypes.array.isRequired,
    onStartSearch: React.PropTypes.func.isRequired,
    onFinishSearch: React.PropTypes.func.isRequired,
    onSearch: React.PropTypes.func.isRequired
  }

  render() {
    const { active, results, query } = this.props
    return (
      <div className="chrome-search">
        <i className="search icon" />
        <div className="ui input">
          <input type="text" placeholder="Search" ref="query" onFocus={this._handleBeginSearch.bind(this)} onChange={this._handleLookup.bind(this)} onBlur={this._handleAbortSearch.bind(this)} value={query} />
        </div>
        { active && query.length > 0 &&
          <div className="chrome-search-cancel" onClick={this._handleAbortSearch.bind(this)}>
            <i className="remove circle icon" />
          </div>
        }
        { active && <div className="chrome-search-overlay" onClick={this._handleAbortSearch.bind(this)}  /> }
        { active && !results &&
          <div className="chrome-search-landing">
            <div className="chrome-search-landing-message">
              <h2>
                <i className="circular search icon" />
              </h2>
              <h3>Search for Anything</h3>
            </div>
          </div>
        }
        { active && results && _.isEmpty(results) &&
          <div className="chrome-search-landing">
            <div className="chrome-search-landing-message">
              <h2>
                <i className="circular remove icon" />
              </h2>
              <h3>No results matched your query</h3>
            </div>
          </div>
        }
        { active && results && !_.isEmpty(results) &&
          <div className="chrome-search-results">
            {Object.keys(results).map((model, modelIndex) => {
              if(results[model].length) {
                return (
                  <div key={`model_${modelIndex}`} className="chrome-search-section">
                    <div className="chrome-search-model" >
                      {model}
                    </div>
                    {results[model].map((result, index) => {
                      return (
                        <div key={`result_${modelIndex}_${index}`} className="chrome-search-result" onClick={this._handleCompleteSearch.bind(this, model, index)}>
                          <p>
                            <strong>{result.name}</strong><br />
                            {result.email}
                          </p>
                        </div>
                      )
                    })}
                  </div>
                )
              }
            })}
          </div>
        }
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { choice } = this.props
    if(prevProps.choice != choice) {
      this.context.router.push({ pathname: choice.route, state: 'static' })
    }
  }

  _handleBeginSearch() {
    this.props.onBeginSearch()
  }

  _handleAbortSearch() {
    const abort = this.props.onAbortSearch.bind(this)
    setTimeout(function() { abort() }, 100)
  }

  _handleCompleteSearch(model, index) {
    this.props.onCompleteSearch(model, index)
  }

  _handleLookup(event) {
    this.props.onLookup(event.target.value)
  }

}

const mapStateToProps = (state) => state.chrome.search

const mapDispatchToProps = {
  onBeginSearch: actions.beginSearch,
  onAbortSearch: actions.abortSearch,
  onCompleteSearch: actions.completeSearch,
  onLookup: actions.lookup
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
