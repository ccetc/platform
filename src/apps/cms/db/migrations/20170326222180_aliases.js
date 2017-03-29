exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('cms_aliases', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('website_id').unsigned()
      table.foreign('website_id').references('cms_websites.id')
      table.string('path')
      table.string('destination')
      table.boolean('is_primary').defaultTo(false)
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('cms_aliases')
  ])
}
