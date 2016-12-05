exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('searches', function (table) {
      table.increments('id').primary()
      table.integer('instance_id').unsigned()
      table.foreign('instance_id').references('instances.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.string('text')
      table.string('subtext')
      table.string('photo')
      table.string('route')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('searches')
  ])
}
