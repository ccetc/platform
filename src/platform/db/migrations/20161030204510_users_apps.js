exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users_apps', function (table) {
      table.increments('id').primary()
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('apps.id')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_apps')
  ])
}
