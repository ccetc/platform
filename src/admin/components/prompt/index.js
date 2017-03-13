import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'

class prompt extends React.Component {

  static childContextTypes = {
    confirm: React.PropTypes.object,
    prompt: React.PropTypes.object,
    tasks: React.PropTypes.object
  }

  static contextTypes = {
    drawer: React.PropTypes.object,
    modal: React.PropTypes.object,
    history: React.PropTypes.object
  }

  static propsTypes = {
    options: React.PropTypes.array
  }

  render() {
    const { children, prompt } = this.props
    return (
      <div className="chrome-prompt">
        { children }
        <CSSTransitionGroup transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppear={true} transitionAppearTimeout={250}>
          { prompt && <div className="chrome-prompt-overlay" onClick={ this._handleClosePrompt.bind(this) } /> }
          { prompt &&
            <div className="chrome-prompt-options">
              { prompt.message &&
                <div className="chrome-prompt-header">
                  { prompt.message }
                </div>
              }
              { prompt.options.map((option, index) => {
                return (
                  <div key={`option_${index}`} className="chrome-prompt-option" onClick={ this._handleChooseOption.bind(this, index) }>
                    { option.label }
                  </div>
                )
              }) }
              { prompt.cancel &&
                <div className="chrome-prompt-cancel" onClick={ this._handleClosePrompt.bind(this) }>
                  Cancel
                </div>
              }
            </div>
          }
        </CSSTransitionGroup>
      </div>
    )
  }

  getChildContext() {
    return {
      tasks: this._getTasksChildContext(),
      prompt: this._getPromptChildContext(),
      confirm: this._getConfirmChildContext()
    }
  }

  _getTasksChildContext() {
    const { open, close } = this.props
    return {
      open: (tasks) => {
        open({
          message: null,
          options: tasks,
          cancel: true
        })
      },
      close
    }
  }

  _getPromptChildContext() {
    const { open, close } = this.props
    return {
      open: (prompt) => {
        open({
          message: prompt.message,
          options: prompt.options,
          cancel: false
        })
      },
      close
    }
  }

  _getConfirmChildContext() {
    const { open, close } = this.props
    return {
      open: (confirm) => {
        open({
          message: confirm.message,
          options: [
            {
              label: 'Yes', handler: () => {
                if(confirm.yes) confirm.yes()
              }
            },{
              label: 'No', handler: () => {
                if(confirm.no) confirm.no()
              }
            }
          ],
          cancel: false
        })
      },
      close
    }
  }

  _handleChooseOption(index) {
    const { prompt } = this.props
    this._handleClosePrompt()
    if(prompt.options[index].route) {
      this.context.history.push(prompt.options[index].route)
    } else if(prompt.options[index].modal){
      this.context.modal.push(prompt.options[index].modal)
    } else if(prompt.options[index].drawer){
      const location = prompt.options[index].location || 'right'
      this.context.drawer.open(prompt.options[index].drawer, location)
    } else if(prompt.options[index].handler){
      prompt.options[index].handler()
    }
  }

  _handleClosePrompt() {
    this.props.close()
  }

}

const mapStateToProps = (state, props) => ({
  prompt: state.prompt
})

const mapDispatchToProps = {
  open: actions.open,
  close: actions.close
}

export default connect(mapStateToProps, mapDispatchToProps)(prompt)
