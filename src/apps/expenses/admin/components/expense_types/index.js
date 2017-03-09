import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import Checkbox from 'admin/components/checkbox'

class ExpenseTypes extends React.Component {

  static contextTypes = {
    modal: React.PropTypes.object
  }

  render() {
    const { expense_types, status } = this.props
    if(status !== 'success') {
      return null
    }
    return (
      <div className="list project-members">
        { expense_types.map((expense_type, index) => {
          return (
            <div key={`expense_type_${index}`} className="item project-member">
              <p>
                <strong>{expense_type.code}</strong><br />
                {expense_type.title}
              </p>
              <Checkbox defaultValue={expense_type.enabled} onChange={ this._handleClick.bind(this, expense_type.id) } />
            </div>
          )
        }) }
      </div>
    )
  }

  componentDidMount() {
    const { project, onLoad } = this.props
    onLoad(project.id)
  }

  _handleClick(id) {
    const { project, onToggle } = this.props
    onToggle(project.id, id)
  }

}

const mapStateToProps = state => ({
  expense_types: state.expenses.expense_types.results,
  status: state.expenses.expense_types.status
})

const mapDispatchToProps = {
  onLoad: actions.load,
  onToggle: actions.toggle
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpenseTypes)
