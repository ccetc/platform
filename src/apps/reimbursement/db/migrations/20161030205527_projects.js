exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('projects', function (table) {
      table.increments('id').primary()
      table.integer('instance_id').unsigned()
      table.foreign('instance_id').references('instances.id')
      table.integer('owner_id').unsigned()
      table.foreign('owner_id').references('users.id')
      table.string('title')
      table.string('code').unique()
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('projects')
  ])
}
