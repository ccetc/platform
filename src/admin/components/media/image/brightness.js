import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Brightness extends React.Component {

  render() {
    return <div>Brightness</div>
  }

}
const mapStateToProps = (state, props) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Brightness)
