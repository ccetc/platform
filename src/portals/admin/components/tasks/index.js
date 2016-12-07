import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import component from 'ui/component'
import * as actions from './actions'

class Tasks extends React.Component {

  static childContextTypes = {
    tasks: React.PropTypes.object
  }

  static contextTypes = {
    modal: React.PropTypes.object,
    router: React.PropTypes.object
  }

  static propsTypes = {
    tasks: React.PropTypes.array
  }

  render() {
    const { children, tasks } = this.props
    return (
      <div className="chrome-tasks">
        { children }
        <CSSTransitionGroup transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppear={true} transitionAppearTimeout={250}>
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
        </CSSTransitionGroup>
      </div>
    )
  }

  getChildContext() {
    const { open, close } = this.props
    return {
      tasks: {
        open,
        close
      }
    }
  }

  _handleChooseTask(index) {
    const { tasks } = this.props
    this._handleCloseTasks()
    if(tasks[index].route) {
      this.context.router.push(tasks[index].route)
    } else if(tasks[index].component){
      this.context.modal.open(tasks[index].component)
    } else if(tasks[index].handler){
      tasks[index].handler()
    }
  }

  _handleCloseTasks() {
    this.props.close()
  }

}


const mapStateToProps = state => ({
  tasks: state.tasks
})

const mapDispatchToProps = {
  open: actions.open,
  close: actions.close
}

export default component(connect(mapStateToProps, mapDispatchToProps)(Tasks), 'tasks', true)
