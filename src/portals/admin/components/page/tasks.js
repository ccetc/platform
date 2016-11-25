import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'
import Modal from './modal'

export class Tasks extends React.Component {

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
    const { show, tasks, task } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppear={true} transitionAppearTimeout={250}>
        { show && <div className="chrome-tasks-overlay" onClick={ this._handleToggleTasks.bind(this) } /> }
        { show &&
          <div className="chrome-tasks">
            {tasks.map((task, index) => {
              return (
                <div key={`task_${index}`} className="chrome-task" onClick={ this._handleChooseTask.bind(this, index) }>
                  { task.label }
                </div>
              )
            })}
            <div className="chrome-cancel" onClick={ this._handleToggleTasks.bind(this) }>
              Cancel
            </div>
          </div>
        }
        { task !== null && tasks[task] && tasks[task].component !== null &&
          <Modal>
            { tasks[task].component }
          </Modal>
        }
      </Transition>
    )
  }

  componentDidUpdate(prevProps) {
    const { tasks, task } = this.props
    if(prevProps.task !== task && task !== null) {
      if(tasks[task].route) {
        this.context.router.push(tasks[task].route)
      } else if(tasks[task].component){
        this.props.onOpenModal()
      }
    }
  }

  _handleToggleTasks() {
    this.props.onToggleTasks()
  }

  _handleChooseTask(index) {
    this.props.onChooseTask(index)
  }

}

const mapStateToProps = (state) => ({
  show: state.tasks.show,
  task: state.tasks.task
})

const mapDispatchToProps = {
  onChooseTask: actions.chooseTask,
  onToggleTasks: actions.toggleTasks,
  onOpenModal: actions.openModal
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
