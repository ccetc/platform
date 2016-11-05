exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', function (table) {
      table.increments('id').primary()
      table.integer('instance_id').unsigned()
      table.foreign('instance_id').references('instances.id')
      table.string('first_name')
      table.string('last_name')
      table.string('email')
      table.string('password_salt')
      table.string('password_hash')
      table.integer('photo_id').unsigned()
      table.foreign('photo_id').references('assets.id')
      table.timestamp('logged_out_at')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users')
  ])
}
