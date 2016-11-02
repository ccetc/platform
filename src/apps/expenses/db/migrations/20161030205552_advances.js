exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('advances', function (table) {
      table.increments('id')
      table.integer('instance_id').unsigned()
      table.foreign('instance_id').references('instances.id')
      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id')
      table.integer('project_id').unsigned()
      table.foreign('project_id').references('projects.id')
      table.integer('expense_type_id').unsigned()
      table.foreign('expense_type_id').references('expense_types.id')
      table.integer('vendor_id').unsigned()
      table.foreign('vendor_id').references('vendors.id')
      table.string('delivery_method')
      table.string('code')
      table.date('date_needed')
      table.decimal('amount', 6, 2)
      table.text('description')
      table.integer('approved_by_id').unsigned()
      table.foreign('approved_by_id').references('users.id')
      table.date('approved_at')
      table.timestamps()
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('advances')
  ])
}
