
exports.seed = (knex, Promise) => {
  return knex('projects').del()
    .then(() => {
      return Promise.all([
        knex('projects').insert({
          instance_id: 1,
          title: 'Primitive Pursuits',
          code: '1234'
        }),
        knex('projects').insert({
          instance_id: 1,
          title: 'Eat Smart New York',
          code: '5678'
        }),
        knex('projects').insert({
          instance_id: 1,
          title: 'Website Platform',
          code: '9012'
        })
      ])
    })
}
