import React from 'react'
import { connect } from 'react-redux'
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
          <input type="text" placeholder="Search" ref="query" onFocus={this._handleBeginSearch.bind(this)} onChange={this._handleLookup.bind(this)} value={query} />
        </div>
        { active && <div key="chrome-search-overlay" className="chrome-search-overlay" onClick={this._handleAbortSearch.bind(this)}  /> }
        { active &&
          <div className="chrome-search-results">
            {results.map((result, index) => {
              return (
                <div key={`result_${index}`} className="chrome-search-result" onClick={this._handleCompleteSearch.bind(this, index)}>
                  <img src={result.photo} />
                  <p>
                    <strong>{result.name}</strong><br />
                    {result.email}
                  </p>
                </div>
              )
            })}
          </div>
        }
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { choice } = this.props
    if(prevProps.choice != choice) {
      this.context.router.push(choice.route)
    }
  }

  _handleBeginSearch() {
    this.props.onBeginSearch()
  }

  _handleAbortSearch() {
    this.props.onAbortSearch()
  }

  _handleCompleteSearch(index) {
    this.props.onCompleteSearch(index)
  }

  _handleLookup(event) {
    this.props.onLookup(event.target.value)
  }

}

const mapStateToProps = (state) => ({
  active: state.search.active,
  query: state.search.query,
  results: state.search.results,
  choice: state.search.choice
})

const mapDispatchToProps = {
  onBeginSearch: actions.beginSearch,
  onAbortSearch: actions.abortSearch,
  onCompleteSearch: actions.completeSearch,
  onLookup: actions.lookup
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)
