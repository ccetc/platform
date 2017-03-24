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
      endpoint: '/admin/competencies/competencies',
      columns: [
        { label: 'Title', key: 'title', primary: true }
      ],
      sort: { key: 'title', order: 'asc' },
      entity: 'competency',
      empty: {
        icon: 'shop'
      },
      filters: [
        { label: 'Category', name: 'category_id', type: 'select', multiple: true, endpoint: '/admin/competencies/categories', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } }
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Competencies',
  task: {}
})

export default Page(mapPropsToPage)(Index)
