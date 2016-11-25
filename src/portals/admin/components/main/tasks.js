import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'

export class Tasks extends React.Component {

  static contextTypes = {
    router: React.PropTypes.object
  }

  static propTypes: {
    showTasks: React.PropTypes.bool,
    tasks: React.PropTypes.array.isRequired,
    task: React.PropTypes.number,
    onChooseTask: React.PropTypes.func.isRequired,
    onToggleTasks: React.PropTypes.func.isRequired
  }

  render() {
    const { showTasks, tasks, task } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppear={true} transitionAppearTimeout={250}>
        { showTasks && <div className="chrome-tasks-overlay" onClick={ this._handleToggleTasks.bind(this) } /> }
        { showTasks &&
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
        { task !== null && tasks[task] && tasks[task].component }
      </Transition>
    )
  }

  componentDidUpdate(prevProps) {
    const { tasks, task } = this.props
    if(prevProps.task !== task && task !== null) {
      if(tasks[task].route) {
        this.context.router.push(tasks[task].route)
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
  showTasks: state.main.showTasks,
  task: state.main.task
})

const mapDispatchToProps = {
  onChooseTask: actions.chooseTask,
  onToggleTasks: actions.toggleTasks
}

export default connect(mapStateToProps, mapDispatchToProps)(Tasks)
