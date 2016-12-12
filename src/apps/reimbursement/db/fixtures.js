
exports.seed = (knex, Promise) => {
  return knex('reimbursement_projects').del()
  .then(() => {
    return knex('reimbursement_projects').insert([
      {
        team_id: 1,
        title: 'Primitive Pursuits',
        code: '1234'
      }, {
        team_id: 1,
        title: 'Eat Smart New York',
        code: '5678'
      }, {
        team_id: 1,
        title: 'Website Platform',
        code: '9012'
      }
    ])
  })
  .then(() => {
    return knex('reimbursement_members').del()
  })
  .then(() => {
    return knex('reimbursement_members').insert([
      {
        team_id: 1,
        project_id: 1,
        user_id: 64
      }, {
        team_id: 1,
        project_id: 1,
        user_id: 54
      }, {
        team_id: 1,
        project_id: 1,
        user_id: 49
      }, {
        team_id: 1,
        project_id: 1,
        user_id: 95
      }, {
        team_id: 1,
        project_id: 1,
        user_id: 63
      }, {
        team_id: 1,
        project_id: 2,
        user_id: 13
      }, {
        team_id: 1,
        project_id: 2,
        user_id: 48
      }, {
        team_id: 1,
        project_id: 2,
        user_id: 1
      }, {
        team_id: 1,
        project_id: 3,
        user_id: 19
      }, {
        team_id: 1,
        project_id: 3,
        user_id: 21
      }, {
        team_id: 1,
        project_id: 3,
        user_id: 1
      }
    ])
  })
  .then(() => {
    return knex('reimbursement_vendors').del()
  })
  .then(() => {
    return knex('reimbursement_vendors').insert([
      {
        team_id: 1,
        name: 'Walmart'
      }, {
        team_id: 1,
        name: 'Target'
      }, {
        team_id: 1,
        name: 'Wegmans'
      }
    ])
  })
  .then(() => {
    return knex('reimbursement_expense_types').del()
  })
  .then(() => {
    return knex('reimbursement_expense_types').insert([
      {
        title: 'Test Expense Type',
        code: '1234'
      }
    ])
  })
  .then(() => {
    return knex('reimbursement_advances').del()
  })
  // .then(() => {
  //   return knex('reimbursement_advances').insert([
  //   ])
  // })
  .then(() => {
    return knex('reimbursement_trips').del()
  })
  // .then(() => {
  //   return knex('reimbursement_trips').insert([
  //   ])
  // })
  .then(() => {
    return knex('reimbursement_expenses').del()
  })
  // .then(() => {
  //   return knex('reimbursement_expenses').insert([
  //   ])
  // })
}
