export default values => ({
  get: value => {
    return values[value] || null
  },
  related: relation => {
    return (values[relation]) ? {
      get: value => {
        return values[relation][value] || null
      }
    } : null
  }
})
