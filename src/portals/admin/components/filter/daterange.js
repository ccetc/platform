import React from 'react'
import Select from './select'

class DateRange extends React.Component {

  render() {
    const options = []
    options.push()
    options.push({ value: 'this_week', text: 'This Week' })
    options.push({ value: 'last_week', text: 'Last Week' })
    options.push({ value: 'next_week', text: 'Next Week' })
    options.push({ value: 'this_month', text: 'This Month' })
    options.push({ value: 'last_month', text: 'Last Month' })
    options.push({ value: 'next_month', text: 'Next Month' })
    options.push({ value: 'this_quarter', text: 'This Quarter' })
    options.push({ value: 'last_quarter', text: 'Last Quarter' })
    options.push({ value: 'next_quarter', text: 'Next Quarter' })
    options.push({ value: 'this_year', text: 'This Year' })
    options.push({ value: 'last_year', text: 'Last Year' })
    options.push({ value: 'next_year', text: 'Next Year' })
    options.push({ value: 'next_year', text: 'Next Year' })
    options.push({ value: 'custom', text: 'Custom' })
    return <Select {...this.props} options={options} />
  }

}

export default DateRange
