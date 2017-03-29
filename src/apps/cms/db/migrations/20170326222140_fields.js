exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('cms_fields', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('website_id').unsigned()
      table.foreign('website_id').references('cms_websites.id')
      table.integer('form_id').unsigned()
      table.foreign('form_id').references('cms_forms.id')
      table.integer('content_type_id').unsigned()
      table.foreign('content_type_id').references('cms_content_types.id')
      table.string('label')
      table.string('code')
      table.string('type')
      table.boolean('is_required').defaultTo(false)
      table.boolean('is_system').defaultTo(false)
      table.boolean('is_disabled').defaultTo(false)
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('cms_fields')
  ])
}
