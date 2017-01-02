import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'
import Filters from './filters'
import Select from './select'

class Index extends React.Component {

  static propTypes = {
    filters: React.PropTypes.array,
    path: React.PropTypes.array,
    state: React.PropTypes.string
  }

  render() {
    const { active, filters } = this.props
    return (
      <div className="filter">
        <Filters filters={ filters } />
        <ReactCSSTransitionGroup transitionName='stack' component={ this._firstChild } transitionEnterTimeout={ 500 } transitionLeaveTimeout={ 500 }>
          { active !== null && <Select { ...filters[active]} /> }
        </ReactCSSTransitionGroup>
      </div>
    )
  }

  _firstChild(props) {
    const childrenArray = React.Children.toArray(props.children)
    return childrenArray[0] || null
  }
}

const mapStateToProps = state => ({
  active: state.filter.active
})

const mapDispatchToProps = {
  onReset: actions.reset
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
