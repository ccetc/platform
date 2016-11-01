exports.seed = (knex, Promise) => {
  return knex('apps').del()
    .then(() => {
      return Promise.all([
        knex('apps').insert({
          id: 1,
          title: 'CRM'
        }),
        knex('apps').insert({
          id: 2,
          title: 'Expenses'
        })
      ])
    })
}
