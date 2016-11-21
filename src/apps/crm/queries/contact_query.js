export default (relation, filters) => {

  if(filters.q) {
    const term = `%${filters.q.toLowerCase()}%`
    relation = relation.query(qb => { qb.whereRaw('LOWER(first_name) LIKE ? OR LOWER(last_name) LIKE ? OR LOWER(email) LIKE ?', [term,term,term]) })
  }

  return relation

}
