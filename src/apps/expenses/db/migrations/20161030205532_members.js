exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('members', function (table) {
      table.increments('id').primary()
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('projects.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.string('title')
      table.string('code')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('members')
  ])
}
