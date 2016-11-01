import knex from 'knex'
import config from '../../config/platform'

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

export default knex({
  ...defaults,
  ...config[process.env.NODE_ENV].database
})
