import React from 'react'
import { connect } from 'react-redux'
import Filter from '../filter'

class Header extends React.Component {

  static contextTypes = {
    tray: React.PropTypes.object
  }

  static propTypes = {
    params: React.PropTypes.object
  }

  render() {
    const { filters, params } = this.props
    return (
      <div className="collection-header">
        <div className="collection-filters">
          { Object.keys(params.filter).map(key => {
            return params.filter[key].map(item => {
              return <span className="ui small basic button">{item.text} <i className="remove icon" /></span>
            })
          }) }
          { filters &&
            <a onClick={ this.context.tray.open.bind(this, <Filter filters={filters} />) } className="ui small basic add button"><i className="plus icon" /> Add Filter</a>
          }
        </div>
      </div>
    )
  }

}

const mapStateToProps = (state, props) => ({
  params: state.collection[props.cid].params
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
