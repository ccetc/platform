
exports.seed = (knex, Promise) => {
  return knex('expenses').del()
    .then(() => {
      return Promise.all([
      ])
    })
}
