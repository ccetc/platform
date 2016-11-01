exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('assets', function (table) {
      table.increments()
      table.integer('instance_id').unsigned()
      table.foreign('instance_id').references('instances.id')
      table.integer('asset_id').unsigned()
      table.foreign('asset_id').references('assets.id')
      table.integer('delta')
      table.binary('data')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
}