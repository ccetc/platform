exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('notifications', function (table) {
      table.increments('id').primary()
      table.integer('team_id').unsigned()
      table.foreign('team_id').references('teams.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.integer('app_id').unsigned()
      table.foreign('app_id').references('apps.id')
      table.integer('subject_id').unsigned()
      table.foreign('subject_id').references('users.id')
      table.integer('story_id').unsigned()
      table.foreign('story_id').references('stories.id')
      table.string('object1_model')
      table.string('object1_id')
      table.string('object1_description')
      table.string('object1_text')
      table.string('object2_model')
      table.string('object2_id')
      table.string('object2_description')
      table.string('object2_text')
      table.string('url')
      table.boolean('is_read')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('notifications')
  ])
}
