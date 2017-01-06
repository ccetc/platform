export default (qb, filters) => {

  if(filters.q) {
    const term = `%${filters.q.toLowerCase()}%`
    qb.whereRaw('(LOWER(title) LIKE ?)', [term])
  }

  qb = filter(qb, filters)

  return qb

}

const filter = (qb, filters) => {

  Object.keys(filters).map(key => {
    if(filters[key].$in) {
      qb.whereIn(key, filters[key].$in)
    } else if(filters[key].$nin) {
      qb.whereNotIn(key, filters[key].$nin)
    } else if(filters[key].$lt) {
      qb.whereNotIn(key, '<', filters[key].$lt)
    } else if(filters[key].$lte) {
      qb.whereNotIn(key, '<=', filters[key].$lte)
    } else if(filters[key].$gt) {
      qb.whereNotIn(key, '>', filters[key].$gt)
    } else if(filters[key].$gte) {
      qb.whereNotIn(key, '>=', filters[key].$gte)
    } else if(filters[key].$ne) {
      qb.whereNotIn(key, '!=', filters[key].$ne)
    }
  })

  return qb

}
