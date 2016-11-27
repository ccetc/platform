import React from 'react'
import Card from 'ui/components/card'
import Container from 'ui/components/container'
import Page from 'portals/admin/components/page'
import Edit from './edit'

class Show extends React.Component {

  static contextTypes = {
    flash: React.PropTypes.object
  }

  render() {
    return (
      <Page {...this._getMain()}>
        <div className="chrome-sidebar">
          <Card {...this._getCard()} />
        </div>
        <div className="chrome-content"></div>
      </Page>
    )
  }

  _getMain() {
    const { expense_type } = this.props
    return {
      back: '/admin/expenses/expense_types',
      title: expense_type.title,
      permissions: [],
      tasks: [
        { label: 'Edit Expense Type', component: <Edit /> }
      ]
    }
  }

  _getCard() {
    const { expense_type } = this.props
    return {
      items: [
        { label: 'Code ', content: expense_type.code, format: 'code' }
      ]
    }
  }

}

const mapEndpointsToProps = (props) => ({
  expense_type: `/admin/expenses/expense_types/${props.params.id}`
})

export default Container(mapEndpointsToProps)(Show)
