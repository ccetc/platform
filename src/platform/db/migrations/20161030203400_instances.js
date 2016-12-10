exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('instances', function (table) {
      table.increments('id').primary()
      table.string('title')
      table.string('subtitle')
      table.string('auth_strategy')
      table.jsonb('auth_config')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('instances')
  ])
}
