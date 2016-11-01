
exports.seed = (knex, Promise) => {
  return knex('members').del()
    .then(() => {
      return Promise.all([
      ])
    })
}
