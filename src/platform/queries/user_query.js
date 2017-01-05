export default (qb, filters) => {

  if(filters.q) {
    const term = `%${filters.q.toLowerCase()}%`
    qb.whereRaw('(LOWER(first_name) LIKE ? OR LOWER(last_name) LIKE ? OR LOWER(email) LIKE ?)', [term,term,term])
  }

  return qb

}
