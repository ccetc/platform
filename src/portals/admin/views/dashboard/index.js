import React from 'react'
import Page from 'portals/admin/containers/page'
import Filter from 'portals/admin/views/filter'

class Dashboard extends React.Component {

  static contextTypes = {
    tray: React.PropTypes.object
  }

  render() {
    const filters = [
      { label: 'Item 1', options: [ { key: 1, value: 'One' }, { key: 2, value: 'Two' }, { key: 3, value: 'Three' }, { key: 4, value: 'Four' } ] },
      { label: 'Item 2', options: [ { key: 1, value: 'One' }, { key: 2, value: 'Two' }, { key: 3, value: 'Three' }, { key: 4, value: 'Four' } ] },
      { label: 'Item 3', options: [ { key: 1, value: 'One' }, { key: 2, value: 'Two' }, { key: 3, value: 'Three' }, { key: 4, value: 'Four' } ] },
      { label: 'Item 4', options: [ { key: 1, value: 'One' }, { key: 2, value: 'Two' }, { key: 3, value: 'Three' }, { key: 4, value: 'Four' } ] },
      { label: 'Item 5', options: [ { key: 1, value: 'One' }, { key: 2, value: 'Two' }, { key: 3, value: 'Three' }, { key: 4, value: 'Four' } ] },
      { label: 'Item 6', options: [ { key: 1, value: 'One' }, { key: 2, value: 'Two' }, { key: 3, value: 'Three' }, { key: 4, value: 'Four' } ] },
      { label: 'Item 7', options: [ { key: 1, value: 'One' }, { key: 2, value: 'Two' }, { key: 3, value: 'Three' }, { key: 4, value: 'Four' } ] },
      { label: 'Item 8', options: [ { key: 1, value: 'One' }, { key: 2, value: 'Two' }, { key: 3, value: 'Three' }, { key: 4, value: 'Four' } ] },
      { label: 'Item 9', options: [ { key: 1, value: 'One' }, { key: 2, value: 'Two' }, { key: 3, value: 'Three' }, { key: 4, value: 'Four' } ] }
    ]

    return (
      <div className="chrome-body">
        <a onClick={ this.context.tray.open.bind(this, <Filter filters={filters} />) }>Open</a>
      </div>
    )
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Dashboard'
})

export default Page(mapPropsToPage)(Dashboard)
