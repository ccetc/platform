import React from 'react'
import * as actions from './actions'
import component from 'portals/admin/components/component'
import Infinite from 'portals/admin/containers/infinite'
import Filter from '../filter'
import Results from './results'

class Collection extends React.Component {

  static contextTypes = {
    location: React.PropTypes.object
  }

  static propTypes = {
    all: React.PropTypes.number,
    columns: React.PropTypes.array,
    endpoint: React.PropTypes.string,
    entity: React.PropTypes.string,
    filters: React.PropTypes.array,
    filter: React.PropTypes.object,
    params: React.PropTypes.object,
    recordActions: React.PropTypes.array,
    sort: React.PropTypes.object,
    total: React.PropTypes.number,
    onFilter: React.PropTypes.func,
    onSort: React.PropTypes.func
  }

  render() {
    const { filters, params } = this.props
    if(params) {
      return (
        <div className="collection">
          { filters &&
            <div className="collection-header">
              <Filter { ...this._getFilter() } />
            </div>
          }
          <Infinite { ...this._getInfinite() }>
            <Results { ...this.props } />
          </Infinite>
        </div>
      )
    } else {
      return null
    }
  }

  componentDidMount() {
    const filter = this.props.filter || {}
    const sort = this.props.sort || {
      key: 'created_at',
      order: 'desc'
    }
    this.props.onSetParams(filter, sort)
  }

  _getFilter() {
    const { filters, params, onFilter } = this.props
    return {
      fields: filters,
      filters: params.filter,
      onChange: onFilter
    }
  }

  _getInfinite() {
    const { endpoint, params } = this.props
    return {
      endpoint,
      sort: (params.sort.order === 'desc' ? '-' : '') + params.sort.key,
      filter: params.filter
    }
  }

}

const mapStateToProps = (state, props) => ({
  params: state.collection[props.cid].params
})

const mapDispatchToProps = {
  onFilter: actions.filter,
  onSetParams: actions.setParams,
  onSort: actions.sort
}

export default component(mapStateToProps, mapDispatchToProps, Collection, 'collection', true)
