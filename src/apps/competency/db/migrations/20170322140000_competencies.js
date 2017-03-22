exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('competency_competencies', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('category_id').unsigned()
      table.foreign('category_id').references('competency_categories.id')
      table.string('title')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('competency_competencies')
  ])
}
