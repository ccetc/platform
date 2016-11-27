
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
  .then(() => {
    return knex('members').insert([
      {
        instance_id: 1,
        project_id: 1,
        user_id: 64
      }, {
        instance_id: 1,
        project_id: 1,
        user_id: 54
      }, {
        instance_id: 1,
        project_id: 1,
        user_id: 49
      }, {
        instance_id: 1,
        project_id: 1,
        user_id: 95
      }, {
        instance_id: 1,
        project_id: 1,
        user_id: 63
      }, {
        instance_id: 1,
        project_id: 2,
        user_id: 13
      }, {
        instance_id: 1,
        project_id: 2,
        user_id: 48
      }, {
        instance_id: 1,
        project_id: 3,
        user_id: 19
      }, {
        instance_id: 1,
        project_id: 21,
        user_id: 19
      }, {
        instance_id: 1,
        project_id: 3,
        user_id: 1
      }
    ])
  })
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
