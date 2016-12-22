const knex = require('knex')
const config = require('server/services/config')

var defaults = {
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'schema_migrations',
    directory: '/'
  },
  seeds: {
    directory: '/'
  }
}

module.exports = knex({
  ...defaults,
  ...config.database
})
