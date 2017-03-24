import React from 'react'
import Page from 'admin/components/page'
import Collection from 'admin/components/collection'
import CompetencyToken from '../../components/competency_token'

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
      endpoint: '/admin/competencies/resources',
      columns: [
        { label: 'Title', key: 'title', primary: true }
      ],
      sort: { key: 'title', order: 'asc' },
      entity: 'resource',
      empty: {
        icon: 'shop'
      },
      filters: [
        { label: 'Competency', name: 'competency_id', type: 'select', multiple: true, endpoint: '/admin/competencies/competencies', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' }, format: CompetencyToken }
      ],
      link: '/admin/competencies/resources/#{id}'
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Resources',
  task: {}
})

export default Page(mapPropsToPage)(Index)
