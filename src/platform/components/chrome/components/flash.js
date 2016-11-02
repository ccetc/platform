import React from 'react'
import Transition from 'react-addons-css-transition-group'
import { connect } from 'react-redux'
import * as actions from '../../session/actions'

export class Flash extends React.Component {

  static propTypes: {
    flash: React.PropTypes.object.isRequired,
    onClearFlash: React.PropTypes.func.isRequired
  }

  render() {
    const { flash } = this.props
    return (
      <Transition transitionName="expanded" transitionEnterTimeout={250} transitionLeaveTimeout={250} transitionAppear={true} transitionAppearTimeout={250}>
        {flash &&
          <div className="chrome-flash">
            {flash.message}
          </div>
        }
      </Transition>
    )
  }

  componentDidMount() {
    if(this.props.flash) {
      const { onClearFlash } = this.props
      setTimeout(onClearFlash, 5000)
    }
  }

}

const mapStateToProps = (state) => ({
  flash: state.session.flash
})

const mapDispatchToProps = {
  onClearFlash: actions.clearFlash
}

export default connect(mapStateToProps, mapDispatchToProps)(Flash)
