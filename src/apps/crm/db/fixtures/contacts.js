
exports.seed = (knex, Promise) => {
  return knex('contacts').del()
    .then(() => {
      return Promise.all([
      ])
    })
}
