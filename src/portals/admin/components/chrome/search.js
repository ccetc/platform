import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import $ from 'jquery'
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
      <Transition transitionName="expanded" transitionEnterTimeout={500} transitionLeaveTimeout={500} transitionAppear={true} transitionAppearTimeout={500}>
        {active &&
          <div className="chrome-search-panel">
            <div className="chrome-search-bar">
              <i className="search icon" />
              <div className="ui input">
                <input type="text" placeholder="Search" ref="query" onChange={this._handleLookup.bind(this)} onBlur={this._handleBlur.bind(this)} value={query} />
              </div>
              <i className="remove icon" onClick={this._handleAbortSearch.bind(this)} />
            </div>
            { !results &&
              <div className="chrome-search-landing">
                <div className="chrome-search-landing-message">
                  <h2>
                    <i className="circular search icon" />
                  </h2>
                  <h3>Search for anything</h3>
                </div>
              </div>
            }
            { results && _.isEmpty(results) &&
              <div className="chrome-search-landing">
                <div className="chrome-search-landing-message">
                  <h2>
                    <i className="circular remove icon" />
                  </h2>
                  <h3>No results matched your query</h3>
                </div>
              </div>
            }
            { results && !_.isEmpty(results) &&
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
        }
      </Transition>
    )
  }

  componentDidUpdate(prevProps) {
    const { active, choice } = this.props
    const { router } = this.context
    if(prevProps.active !== active) {
      $(this.refs.query).focus()
    }
    if(prevProps.choice !== choice) {
      window.setTimeout(function() {
        router.push({ pathname: choice.route, state: 'static' })
      }, 500)
    }
  }

  _handleBeginSearch() {
    this.props.onBeginSearch()
  }

  _handleBlur() {
    const { onAbortSearch } = this.props
    window.setTimeout(function() {
      onAbortSearch()
    }, 250)
  }

  _handleAbortSearch() {
    this.props.onAbortSearch()
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
