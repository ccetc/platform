exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('cms_nodes', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('website_id').unsigned()
      table.foreign('website_id').references('cms_websites.id')
      table.integer('content_type_id').unsigned()
      table.foreign('content_type_id').references('cms_content_types.id')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('cms_nodes')
  ])
}
