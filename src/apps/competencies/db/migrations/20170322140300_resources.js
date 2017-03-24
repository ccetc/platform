exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('competencies_resources', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.string('title')
      table.text('description')
      table.string('url')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('competencies_resources')
  ])
}
