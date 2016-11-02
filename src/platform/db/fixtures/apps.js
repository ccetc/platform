exports.seed = (knex, Promise) => {
  return knex('apps').del()
    .then(() => {
      return Promise.all([
        knex('apps').insert({
          title: 'CRM'
        }),
        knex('apps').insert({
          title: 'Expenses'
        }),
        knex('apps').insert({
          title: 'Instance'
        })
      ])
    })
}
