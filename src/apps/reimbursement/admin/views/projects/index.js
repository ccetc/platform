import React from 'react'
import { Link } from 'react-router'
import Page from 'portals/admin/containers/page'
import Collection from 'portals/admin/components/collection'
import New from './new'

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
      endpoint: '/admin/reimbursement/projects',
      columns: [
        { label: 'Title', key: 'title', primary: true, format: TitleCell },
        { label: 'Code', key: 'code', primary: true }
      ],
      sort: { key: 'created_at', order: 'desc' },
      entity: 'project',
      empty: {
        icon: 'folder',
        component: New
      },
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/reimbursement/projects/#{id}/edit'}
      ]
    }
  }

}

var TitleCell = (props) => {
  return (
    <Link to={`/admin/reimbursement/projects/${props.id}` }>
      {props.title}
    </Link>
  )
}

const mapPropsToPage = (props, context) => ({
  back: '/admin',
  title: 'Projects',
  task: {
    label: 'New Project',
    icon: 'plus',
    component: New
  }
})

export default Page(mapPropsToPage)(Index)
