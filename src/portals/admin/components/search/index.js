import React from 'react'
import { connect } from 'react-redux'
import component from 'ui/component'
import $ from 'jquery'
import _ from 'lodash'
import * as actions from './actions'

export class Search extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object,
    router: React.PropTypes.object
  }

  static propTypes = {
    active: React.PropTypes.bool.isRequired,
    choice: React.PropTypes.number,
    query: React.PropTypes.string,
    results: React.PropTypes.array,
    onAbortSearch: React.PropTypes.func.isRequired,
    onCompleteSearch: React.PropTypes.func.isRequired,
    onLookup: React.PropTypes.func.isRequired
  }

  render() {
    const { results, query } = this.props
    return (
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
                            <strong>{result.text}</strong><br />
                            {result.subtext}
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

  componentDidMount() {
    const query = $(this.refs.query)
    window.setTimeout(function() {
      query.focus()
    }, 500)
  }

  componentDidUpdate(prevProps) {
    const { choice } = this.props
    if(prevProps.choice !== choice) {
      this.context.router.push({ pathname: choice.route, state: 'static' })
      this.context.modal.close()
    }
  }

  _handleBlur() {
    const { onAbortSearch } = this.props
    window.setTimeout(function() {
      onAbortSearch()
    }, 250)
  }

  _handleAbortSearch() {
    this.context.modal.close()
  }

  _handleCompleteSearch(model, index) {
    this.props.onCompleteSearch(model, index)
  }

  _handleLookup(event) {
    this.props.onLookup(event.target.value)
  }

}

const mapStateToProps = state => ({
  ...state.search
})

const mapDispatchToProps = {
  onAbortSearch: actions.abortSearch,
  onCompleteSearch: actions.completeSearch,
  onLookup: actions.lookup
}

export default component(connect(mapStateToProps, mapDispatchToProps)(Search), 'search', true)
