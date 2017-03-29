exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('cms_responses', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('website_id').unsigned()
      table.foreign('website_id').references('cms_websites.id')
      table.integer('form_id').unsigned()
      table.foreign('form_id').references('cms_forms.id')
      table.jsonb('data')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('cms_responses')
  ])
}
