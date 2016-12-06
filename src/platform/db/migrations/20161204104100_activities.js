exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('activities', function (table) {
      table.increments('id').primary()
      table.integer('instance_id').unsigned()
      table.foreign('instance_id').references('instances.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.integer('story_id').unsigned()
      table.foreign('story_id').references('stories.id')
      table.string('url')
      table.string('subject_type')
      table.string('subject_text')
      table.string('object1_type')
      table.string('object1_text')
      table.string('object2_type')
      table.string('object2_text')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('activities')
  ])
}
