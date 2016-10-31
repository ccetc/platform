
import services from '../../services'

const unique = function(table, attribute) {
  return function(val) {
    let query = services.knex(table).where(attribute, '=', val)
    if(this.target.id) {
      query = query.whereNot({ id: this.target.id })
    }
    return query.then(resp => {
      if (resp.length > 0) throw new Error('This '+attribute+' is already in use')
    })
  }
}

export default unique
