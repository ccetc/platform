exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('cms_authors', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('website_id').unsigned()
      table.foreign('website_id').references('cms_websites.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.string('type')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('cms_authors')
  ])
}
