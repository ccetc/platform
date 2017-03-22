exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('competency_resources', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('skill_id').unsigned()
      table.foreign('skill_id').references('competency_skills.id')
      table.string('title')
      table.text('description')
      table.string('url')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('competency_resources')
  ])
}
