import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

export class Topbar extends React.Component {

  static propTypes: {
    expanded: React.PropTypes.bool.isRequired,
    results: React.PropTypes.array.isRequired,
    onToggleDrawer: React.PropTypes.func.isRequired
  }

  render() {
    const { results } = this.props
    return (
      <div className="chrome-topbar">
        <div className="chrome-toggle" onClick={this._handleToggleDrawer.bind(this)}>
          <i className="sidebar icon" />
        </div>
        <div className="chrome-search">
          <i className="search icon" />
          <div className="ui input">
            <input type="text" placeholder="Search" />
          </div>
          <div className="chrome-search-results">
            {results.map((result, index) => {
              return (
                <div key={`result_${index}`} className="chrome-search-result">
                  <img src={result.photo} />
                  <p>
                    <strong>{result.name}</strong><br />
                    {result.email}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }

  _handleToggleDrawer() {
    this.props.onToggleDrawer()
  }

}

const mapStateToProps = (state) => ({
  expanded: state.chrome.expanded,
  results: state.chrome.results
})

const mapDispatchToProps = {
  onToggleDrawer: actions.toggleDrawer
}

export default connect(mapStateToProps, mapDispatchToProps)(Topbar)
