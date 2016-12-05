exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('expense_types', function (table) {
      table.increments('id').primary()
      table.integer('instance_id').unsigned()
      table.foreign('instance_id').references('instances.id')
      table.string('title')
      table.string('code')
      table.text('description')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('expense_types')
  ])
}
