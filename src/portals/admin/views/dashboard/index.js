import React from 'react'
import Page from 'portals/admin/containers/page'
import Filter from 'portals/admin/views/filter'

class Dashboard extends React.Component {

  static contextTypes = {
    tray: React.PropTypes.object
  }

  render() {
    const filters = [
      { label: 'Users', name: 'user_id', options: [ { key: 1, value: 'One' }, { key: 2, value: 'Two' }, { key: 3, value: 'Three' }, { key: 4, value: 'Four' } ] },
      { label: 'Projects', name: 'project_id', options: [ { key: 5, value: 'Five' }, { key: 6, value: 'Six' }, { key: 7, value: 'Seven' }, { key: 8, value: 'Eight' } ] },
      { label: 'Expense Types', name: 'expense_type_id', options: [ { key: 1, value: 'One' }, { key: 2, value: 'Two' }, { key: 3, value: 'Three' }, { key: 4, value: 'Four' } ] }
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
