exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('competency_requirements', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('position_id').unsigned()
      table.foreign('position_id').references('competency_positions.id')
      table.integer('competency_id').unsigned()
      table.foreign('competency_id').references('competency_competencies.id')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('competency_requirements')
  ])
}
