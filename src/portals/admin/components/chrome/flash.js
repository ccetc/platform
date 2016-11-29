
import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'

export class Flash extends React.Component {

  static contextTypes = {
    session: React.PropTypes.object
  }

  static propTypes = {
    flash: React.PropTypes.object.isRequired,
    onSet: React.PropTypes.func.isRequired,
    onClear: React.PropTypes.func.isRequired
  }

  render() {
    const { flash } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppear={true} transitionAppearTimeout={250}>
        {flash &&
          <div className={`chrome-flash ${flash.style}`}>
            <p>
              { this._getIcon(flash.style) }
              { flash.message }
            </p>
          </div>
        }
      </Transition>
    )
  }

  componentDidUpdate(prevProps) {
    const { flash } = this.props
    const { clearFlash } = this.context.session
    if(prevProps.flash !== flash && flash) {
      window.setTimeout(clearFlash , 1500)
    }
  }

  _getIcon(style) {
    if(style == 'success') {
      return <i className="check circle icon" />
    } else if(style == 'info') {
      return <i className="info circle icon" />
    } else if(style == 'warning') {
      return <i className="warning sign icon" />
    } else if(style == 'error') {
      return <i className="remove circle icon" />
    }
  }

}

const mapStateToProps = state => ({
  flash: state.session.flash
})

export default connect(mapStateToProps)(Flash)
