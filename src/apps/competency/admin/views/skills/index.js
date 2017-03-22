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
      endpoint: '/admin/competency/skills',
      columns: [
        { label: 'Description', key: 'description', primary: true }
      ],
      sort: { key: 'description', order: 'asc' },
      entity: 'skill',
      empty: {
        icon: 'shop'
      },
      filters: [
        { label: 'Competency', name: 'competency_id', type: 'select', multiple: true, endpoint: '/admin/competency/competencies', value: 'id', text: 'title', sort: { key: 'title', order: 'asc' } },
        { label: 'Level', name: 'level', type: 'select', options: [ { value: '1', text: '1', token: 'Level 1' }, { value: '2', text: '2', token: 'Level 2' }, { value: '3', text: '3', token: 'Level 3' } ] }
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Skills',
  task: {}
})

export default Page(mapPropsToPage)(Index)
