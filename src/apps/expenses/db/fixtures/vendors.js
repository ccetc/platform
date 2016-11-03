
exports.seed = (knex, Promise) => {
  return knex('vendors').del()
    .then(() => {
      return Promise.all([
        knex('vendors').insert({
          instance_id: 1,
          name: 'Walmart'
        }),
        knex('vendors').insert({
          instance_id: 1,
          name: 'Target'
        }),
        knex('vendors').insert({
          instance_id: 1,
          name: 'Wegmans'
        })
      ])
    })
}
