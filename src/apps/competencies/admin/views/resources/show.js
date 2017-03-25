import React from 'react'
import Details from 'admin/components/details'
import Page from 'admin/components/page'
import Media from 'admin/components/media'

class Show extends React.Component {

  render() {
    const { resource } = this.props
    return (
      <div className="chrome-main">
        <div className="chrome-body">
          <div className="chrome-sidebar">
            <Details {...this._getDetails()} />
            <Media />
          </div>
        </div>
        { resource.url &&
          <div className="chrome-cta">
            <a href={ resource.url } className="ui fluid primary button" target="_blank">View Resource Online</a>
          </div>
        }
      </div>
    )
  }

  _getDetails() {
    const { resource } = this.props
    return {
      items: [
        { label: 'Title ', content: resource.title },
        { label: 'Description ', content: resource.description }
      ]
    }
  }

}

const mapPropsToPage = (props, context) => {
  return {
    title: 'Resource',
    resources: {
      resource: `/admin/competencies/resources/${props.params.id}`
    }
  }
}

export default Page(mapPropsToPage)(Show)
