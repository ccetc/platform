exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('vendors', function (table) {
      table.increments('id').primary()
      table.integer('instance_id').unsigned()
      table.foreign('instance_id').references('instances.id')
      table.string('name')
      table.string('address_1')
      table.string('address_2')
      table.string('city')
      table.string('state')
      table.string('zip')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('vendors')
  ])
}
