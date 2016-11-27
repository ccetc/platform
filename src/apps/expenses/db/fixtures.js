
exports.seed = (knex, Promise) => {
  return knex('projects').del()
  .then(() => {
    return knex('projects').insert([
      {
        instance_id: 1,
        title: 'Primitive Pursuits',
        code: '1234'
      }, {
        instance_id: 1,
        title: 'Eat Smart New York',
        code: '5678'
      }, {
        instance_id: 1,
        title: 'Website Platform',
        code: '9012'
      }
    ])
  })
  .then(() => {
    return knex('members').del()
  })
  // .then(() => {
  //   return knex('members').insert([
  //   ])
  // })
  .then(() => {
    return knex('vendors').del()
  })
  .then(() => {
    return knex('vendors').insert([
      {
        instance_id: 1,
        name: 'Walmart'
      }, {
        instance_id: 1,
        name: 'Target'
      }, {
        instance_id: 1,
        name: 'Wegmans'
      }
    ])
  })
  .then(() => {
    return knex('expense_types').del()
  })
  .then(() => {
    return knex('expense_types').insert([
      {
        title: 'Test Expense Type',
        code: '1234'
      }
    ])
  })
  .then(() => {
    return knex('advances').del()
  })
  // .then(() => {
  //   return knex('advances').insert([
  //   ])
  // })
  .then(() => {
    return knex('trips').del()
  })
  // .then(() => {
  //   return knex('trips').insert([
  //   ])
  // })
  .then(() => {
    return knex('expenses').del()
  })
  // .then(() => {
  //   return knex('expenses').insert([
  //   ])
  // })
}
