import React from 'react'
import Details from 'portals/admin/components/details'
import Page from 'portals/admin/containers/page'
import Access from '../../components/access'
import Edit from './edit'

class Show extends React.Component {

  render() {
    return (
      <div className="chrome-body">
        <div className="chrome-sidebar">
          <Details {...this._getDetails()} />
        </div>
        <div className="chrome-content"></div>
      </div>
    )
  }

  _getDetails() {
    const { role } = this.props
    return {
      items: [
        { label: 'Title ', content: role.title },
        { label: 'Description ', content: role.description }
      ]
    }
  }

}

const mapPropsToPage = (props, context) => {

  return {
    title: 'Role',
    rights: [],
    tasks: [
      { label: 'Edit Role', modal: Edit },
      { label: 'Edit Access', modal: Access }
    ],
    resources: {
      role: `/admin/roles/${props.params.id}`
    }
  }
}

export default Page(mapPropsToPage)(Show)
