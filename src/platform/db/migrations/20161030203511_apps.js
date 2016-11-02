exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('apps', function (table) {
      table.increments('id')
      table.string('title')
      table.string('description')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('apps')
  ])
}
