exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('instances', function (table) {
      table.increments('id')
      table.string('title')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('instances')
  ])
}
