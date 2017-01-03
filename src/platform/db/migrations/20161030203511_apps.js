exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('apps', function (table) {
      table.increments('id').primary()
      table.string('title')
      table.string('author')
      table.string('version')
      table.string('short_description')
      table.text('long_description')
      table.string('icon')
      table.string('category')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('apps')
  ])
}
