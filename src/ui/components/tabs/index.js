import React from 'react'
import _ from 'lodash'
import Tab from './tab'
import { connect } from 'react-redux'
import * as actions from './actions'

export class Tabs extends React.Component {

  static propTypes = {
    tabs: React.PropTypes.arrayOf(React.PropTypes.shape({
      label: React.PropTypes.string,
      content: React.PropTypes.oneOfType([
        React.PropTypes.string,
        React.PropTypes.func,
        React.PropTypes.element
      ])
    })).isRequired,
    active: React.PropTypes.number,
    onChangeTab: React.PropTypes.func
  }

  render() {
    const { tabs, active } = this.props
    const content = tabs[active].content
    return (
      <div className="tabs">
        <div className="ui top attached tabular menu">
          {tabs.map((tab, index) => {
            let isActive = (index == active)
            return <Tab key={`tab_${index}`} active={isActive} label={tab.label} onChangeTab={this._handleChangeTab.bind(this, index)} />
          })}
       </div>
       <div className="ui bottom attached active tab segment">
         { _.isString(content) && <p>{content}</p> }
         { _.isElement(content) && <content /> }
         { _.isFunction(content) && content() }
       </div>
     </div>
    )
  }

  _handleChangeTab(index) {
    this.props.onChangeTab(index)
  }

}

const mapStateToProps = (state) => ({
  active: state.tabs.active
})

const mapDispatchToProps = {
  onChangeTab: actions.changeTab
}

export default connect(mapStateToProps, mapDispatchToProps)(Tabs)
