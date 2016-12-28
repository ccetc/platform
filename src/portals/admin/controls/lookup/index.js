import React from 'react'
import component from 'portals/admin/components/component'
import _ from 'lodash'
import * as actions from './actions'
import Search from './search'

class Lookup extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  static propTypes = {
    active: React.PropTypes.bool
  }

  render() {
    const { index, results, value } = this.props
    const chosen = (index !== null) ? results[index] : null
    return (
      <div className="lookup-field">
        <input type="text"
               onFocus={ this._handleBegin.bind(this) }
               value={ chosen ? _.get(chosen, value) : '' }/>
      </div>
    )
  }

  componentDidUpdate(prevProps) {
    const { active } = this.props
    if(prevProps.active !== active && active) {
      this.context.modal.push(<Search {...this.props} />)
    }
  }

  _handleBegin() {
    this.props.onBegin()
  }

}

const mapStateToProps = (state, props) => ({
  active: state.lookup[props.cid].active,
  index: state.lookup[props.cid].index,
  results: state.lookup[props.cid].results
})

const mapDispatchToProps = {
  onBegin: actions.begin
}

export default component(mapStateToProps, mapDispatchToProps, Lookup, 'lookup', true)
