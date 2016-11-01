
exports.seed = (knex, Promise) => {
  return knex('expense_types').del()
    .then(() => {
      return Promise.all([
      ])
    })
}
