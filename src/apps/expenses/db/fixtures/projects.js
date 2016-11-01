
exports.seed = (knex, Promise) => {
  return knex('projects').del()
    .then(() => {
      return Promise.all([
      ])
    })
}
