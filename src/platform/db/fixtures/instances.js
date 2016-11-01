exports.seed = (knex, Promise) => {
  return knex('instances').del()
    .then(() => {
      return Promise.all([
        knex('instances').insert({
          id: 1,
          title: 'Cornell Cooperative Extension of Tompkins County'
        })
      ])
    })
}
