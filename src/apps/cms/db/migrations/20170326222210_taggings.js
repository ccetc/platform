exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('cms_taggings', function (table) {
      table.integer('tag_id').unsigned()
      table.foreign('tag_id').references('cms_tags.id')
      table.integer('node_id').unsigned()
      table.foreign('node_id').references('cms_nodes.id')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('cms_taggings')
  ])
}
