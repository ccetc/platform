exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('competency_commitments', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('plan_id').unsigned()
      table.foreign('plan_id').references('competency_plans.id')
      table.integer('resource_id').unsigned()
      table.foreign('resource_id').references('competency_resources.id')
      table.boolean('is_completed').defaultTo(false)
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('competency_commitments')
  ])
}
