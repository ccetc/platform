export default (attribute) => {

  return function(value) {

    if(!value.match(/^\d{4}-\d{2}-\d{2}$/)) {
      throw new Error(`The ${attribute} must be in the format YYYY-MM-DD`)
    }

  }

}
