
exports.seed = (knex, Promise) => {
  return knex('advances').del()
    .then(() => {
      return Promise.all([
      ])
    })
}
