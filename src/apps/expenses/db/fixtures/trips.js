
exports.seed = (knex, Promise) => {
  return knex('trips').del()
    .then(() => {
      return Promise.all([
      ])
    })
}
