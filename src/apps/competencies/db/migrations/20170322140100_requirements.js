exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('competencies_requirements', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('position_id').unsigned()
      table.foreign('position_id').references('competencies_positions.id')
      table.integer('competencies_id').unsigned()
      table.foreign('competencies_id').references('competencies_competencies.id')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('competencies_requirements')
  ])
}
