import React from 'react'
import { connect } from 'react-redux'
import * as actions from './actions'
import Modal from './modal'

export class Task extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes: {
    show: React.PropTypes.bool,
    tasks: React.PropTypes.array.isRequired,
    task: React.PropTypes.number,
    onChooseTask: React.PropTypes.func.isRequired,
    onToggleTasks: React.PropTypes.func.isRequired,
    onOpenModal: React.PropTypes.func.isRequired
  }

  render() {
    const { icon, component } = this.props
    return (
      <div className="chrome-task">
        <a onClick={this._handleClick.bind(this)}>
          <i className={`${icon} icon`} />
        </a>
        { component !== null &&
          <Modal>
            { component }
          </Modal>
        }
      </div>
    )
  }

  _handleClick() {
    const { route, component } = this.props
    if(route) {
      this.context.router.push(route)
    } else if(component) {
      this.props.onOpenModal()
    }
  }

}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {
  onOpenModal: actions.openModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Task)
