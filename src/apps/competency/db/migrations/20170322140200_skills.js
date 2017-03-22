exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('competency_skills', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('competency_id').unsigned()
      table.foreign('competency_id').references('competency_competencies.id')
      table.string('level')
      table.text('description')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('competency_skills')
  ])
}
