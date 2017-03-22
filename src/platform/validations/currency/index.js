export default (attribute) => {

  return function(value) {

    if(!value.match(/^\d{1,}\.\d{2}$/)) {
      throw new Error(`The ${attribute} must be valid currency`)
    }

  }

}
