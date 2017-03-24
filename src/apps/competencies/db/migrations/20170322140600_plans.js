exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('competencies_plans', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.integer('supervisor_id').unsigned()
      table.foreign('supervisor_id').references('users.id')
      table.date('due')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('competencies_plans')
  ])
}
