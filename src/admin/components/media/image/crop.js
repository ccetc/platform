import React from 'react'
import { connect } from 'react-redux'
import * as actions from '../actions'

class Crop extends React.Component {

  render() {
    return <div>Crop</div>
  }

}
const mapStateToProps = (state, props) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Crop)
