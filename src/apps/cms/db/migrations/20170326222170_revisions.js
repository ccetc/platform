exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('cms_revisions', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('website_id').unsigned()
      table.foreign('website_id').references('cms_websites.id')
      table.integer('node_id').unsigned()
      table.foreign('node_id').references('cms_nodes.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.string('title')
      table.string('meta_title')
      table.string('meta_description')
      table.integer('meta_thumbnail_id')
      table.jsonb('meta_thumbnail_crop')
      table.datetime('published_at')
      table.jsonb('data')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('cms_revisions')
  ])
}
