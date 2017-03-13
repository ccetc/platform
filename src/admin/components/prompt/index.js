import React from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from './actions'

class prompt extends React.Component {

  static childContextTypes = {
    confirm: React.PropTypes.object,
    prompt: React.PropTypes.object
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
            </div>
          }
        </CSSTransitionGroup>
      </div>
    )
  }

  getChildContext() {
    return {
      prompt: this._getPromptChildContext(),
      confirm: this._getConfirmChildContext()
    }
  }

  _getPromptChildContext() {
    const { open, close } = this.props
    return {
      open: (prompt) => {
        open({
          message: prompt.message,
          options: prompt.options
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
          ]
        })
      },
      close
    }
  }

  _handleChooseOption(index) {
    const { prompt } = this.props
    this._handleClosePrompt()
    if(prompt.options[index].handler){
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
