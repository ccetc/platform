import _ from 'lodash'

export default (attribute) => {

  return function(value) {

    console.log(value)

    if(_.isString(value) && !value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      throw new Error(`The ${attribute} must be in the format YYYY-MM-DD`)
    }

  }

}
