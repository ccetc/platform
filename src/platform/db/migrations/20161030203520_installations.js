exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('installations', function (table) {
      table.increments('id').primary()
      table.integer('instance_id').unsigned()
      table.foreign('instance_id').references('instances.id')
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('apps.id')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('installations')
  ])
}
