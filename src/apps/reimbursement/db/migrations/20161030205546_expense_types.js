exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('reimbursement_expense_types', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.string('title')
      table.string('code')
      table.text('description')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('reimbursement_expense_types')
  ])
}
