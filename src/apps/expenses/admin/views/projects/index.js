import React from 'react'
import { Link } from 'react-router'
import Page from 'portals/admin/components/page'
import Collection from 'ui/components/collection'
import New from './new'

class Index extends React.Component {

  render() {
    return (
      <Page {...this._getMain()}>
        <Collection {...this._getCollection()} />
      </Page>
    )
  }

  _getCollection() {
    return {
      endpoint: '/admin/expenses/projects',
      columns: [
        { label: 'Title', key: 'title', primary: true, format: TitleCell },
        { label: 'Code', key: 'code', primary: true }
      ],
      sort: { key: 'created_at', order: 'desc' },
      entity: 'project',
      empty: {
        icon: 'folder',
        component: <New />
      },
      recordActions: [
        { label: 'edit', icon: 'edit', redirect: '/admin/expenses/projects/#{id}/edit'}
      ]
    }
  }

  _getMain() {
    return {
      back: '/admin',
      title: 'Projects',
      task: {
        label: 'New Project',
        icon: 'plus',
        component: <New />
      }
    }
  }

}

var TitleCell = (props) => {
  return (
    <Link to={`/admin/expenses/projects/${props.id}` }>
      {props.title}
    </Link>
  )
}

export default Index
