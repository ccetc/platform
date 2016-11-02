exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('assets', function (table) {
      table.increments('id')
      table.integer('instance_id').unsigned()
      table.foreign('instance_id').references('instances.id')
      table.string('status')
      table.string('original_file_name')
      table.string('file_name')
      table.string('content_type')
      table.string('fingerprint')
      table.integer('width')
      table.integer('height')
      table.integer('file_size')
      table.integer('chunks_total')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('assets')
  ])
}
