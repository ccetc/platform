exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('competency_positions', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('classification_id').unsigned()
      table.foreign('classification_id').references('competency_classifications.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('competency_programs.id')
      table.string('title')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('competency_positions')
  ])
}
