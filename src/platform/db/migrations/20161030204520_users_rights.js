exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users_rights', function (table) {
      table.increments('id').primary()
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.integer('right_id').unsigned()
      table.foreign('right_id').references('rights.id')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users_rights')
  ])
}
