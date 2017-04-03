import React from 'react'
import Page from 'admin/components/page'

class Author extends React.Component {

  render() {
    const { author } = this.props
    return (
      <div className="chrome-body">
        <div className="author">
          <div className="author-details">
            <h2>{ author.name }</h2>
          </div>
        </div>
      </div>
    )
  }

}

const mapResourcesToPage = (props, context) => ({
  author: `/admin/team/apps/authors/${props.params.id}`
})

const mapPropsToPage = (props, context, resources) => ({
  title: 'Author',
  rights: ['team.manage_apps']
})

export default Page(mapResourcesToPage, mapPropsToPage)(Author)
