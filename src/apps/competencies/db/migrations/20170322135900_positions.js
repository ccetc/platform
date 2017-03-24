exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('competencies_positions', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('classification_id').unsigned()
      table.foreign('classification_id').references('competencies_classifications.id')
      table.integer('program_id').unsigned()
      table.foreign('program_id').references('competencies_programs.id')
      table.string('title')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('competencies_positions')
  ])
}
