import React from 'react'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'

class Index extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <Collection {...this._getCollection()} />
      </div>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/competencies/categories',
      columns: [
        { label: 'Title', key: 'title', primary: true }
      ],
      sort: { key: 'title', order: 'asc' },
      entity: 'category',
      empty: {
        icon: 'shop'
      }
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Categories',
  task: {}
})

export default Page(mapPropsToPage)(Index)
