import React from 'react'
import _ from 'lodash'

import Dynamic from './dynamic'
import Checkbox from './checkbox'
// import Checkboxes from './checkboxes'
// import ColorField from './colorfield'
import FileField from './filefield'
import Lookup from './lookup'
// import MultiSelect from './multiselect'
// import Radios from './radios'
import Select from './select'
// import TableField from './tablefield'
import TextArea from './textarea'
import TextField from './textfield'
import Password from './password'
import DateField from './datefield'

const standardControls = {
  'checkbox': Checkbox,
  // 'checkboxes': Checkboxes,
  // 'colorfield': ColorField,
  'filefield': FileField,
  'lookup': Lookup,
  // 'multiselect': MultiSelect,
  // 'radios': Radios,
  'select': Select,
  'textfield': TextField,
  'password': Password,
  'textarea': TextArea,
  'datefield': DateField
  // 'tablefield': TableField
}

class Control extends React.Component {

  static propTypes = {
    type: React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.element
    ]),
    endpoint: React.PropTypes.string,
    defaultValue: React.PropTypes.any,
    options: React.PropTypes.array
  }

  static defaultProps = {
    type: 'textfield',
    datasource: null,
    options: []
  }

  constructor(props) {
    super(props)
  }

  render() {
    const { type, endpoint } = this.props
    const Element = (_.isString(this.props.type)) ? _.get(standardControls, type) : type
    return (
      <div className="control">
        { endpoint && _.includes(['select'], type) ?
          <Dynamic {...this._getDynamic()}>
            <Element {...this.props} />
          </Dynamic> :
          <Element {...this.props} />
        }
      </div>
    )
  }

  _getDynamic() {
    const { endpoint, key, value } = this.props
    return {
      endpoint,
      key,
      value
    }
  }

}

export default Control
