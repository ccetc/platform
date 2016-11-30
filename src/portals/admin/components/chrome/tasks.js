import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

class Tasks extends React.Component {

  static contextTypes = {
    chrome: React.PropTypes.object
  }

  static propsTypes = {
    tasks: React.PropTypes.array
  }

  render() {
    const { tasks } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppear={true} transitionAppearTimeout={250}>
        { tasks && <div className="chrome-tasks-overlay" onClick={ this._handleCloseTasks.bind(this) } /> }
        { tasks &&
          <div className="chrome-tasks-list">
            {tasks.map((task, index) => {
              return (
                <div key={`task_${index}`} className="chrome-tasks-item" onClick={ this._handleChooseTask.bind(this, index) }>
                  { task.label }
                </div>
              )
            })}
            <div className="chrome-tasks-cancel" onClick={ this._handleCloseTasks.bind(this) }>
              Cancel
            </div>
          </div>
        }
      </Transition>
    )
  }

  _handleChooseTask(index) {
    const { tasks } = this.props
    this.context.chrome.closeTasks()
    if(tasks[index].route) {
      this.context.chrome.transitionTo(tasks[index].route)
    } else if(tasks[index].component){
      this.context.chrome.openModal(tasks[index].component)
    } else if(tasks[index].handler){
      tasks[index].handler()
    }
  }

  _handleCloseTasks() {
    this.context.chrome.closeTasks()
  }

}

const mapStateToProps = (state) => ({
  tasks: state.chrome.tasks
})

export default connect(mapStateToProps)(Tasks)
