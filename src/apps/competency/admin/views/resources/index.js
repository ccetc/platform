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
      endpoint: '/admin/competency/resources',
      columns: [
        { label: 'Title', key: 'title', primary: true }
      ],
      sort: { key: 'title', order: 'asc' },
      entity: 'resource',
      empty: {
        icon: 'shop'
      },
      filters: [
        { label: 'Skill', name: 'skill_id', type: 'select', multiple: true, endpoint: '/admin/competency/skills', value: 'id', text: 'description', sort: { key: 'description', order: 'asc' } }
      ]
    }
  }

}

const mapPropsToPage = (props, context) => ({
  title: 'Resources',
  task: {}
})

export default Page(mapPropsToPage)(Index)
