exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('trips', function (table) {
      table.increments()
      table.integer('instance_id').unsigned()
      table.foreign('instance_id').references('instances.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('projects.id')
      table.date('date')
      table.text('description')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('trips')
  ])
}
