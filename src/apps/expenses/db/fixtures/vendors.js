
exports.seed = (knex, Promise) => {
  return knex('vendors').del()
    .then(() => {
      return Promise.all([
      ])
    })
}
