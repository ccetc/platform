exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('competencies_competencies_resources', function (table) {
      table.integer('competency_id').unsigned()
      table.foreign('competency_id').references('competencies_competencies.id')
      table.integer('resource_id').unsigned()
      table.foreign('resource_id').references('competencies_resources.id')
    })
  ])
}

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('competencies_competencies_resources')
  ])
}
