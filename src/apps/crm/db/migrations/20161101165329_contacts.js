exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('contacts', function (table) {
      table.increments('id')
      table.integer('instance_id').unsigned()
      table.foreign('instance_id').references('instances.id')
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('contacts')
  ])
}
