const dotenv = require('dotenv')
const knex = require('knex')

dotenv.config({ path: '.env.' + process.env.NODE_ENV })

let database = {
  pool: {
    min: 1,
    max: 1
  },
  migrations: {
    tableName: 'schema_migrations',
    directory: 'db/migrations'
  },
  seeds: {
    directory: 'db'
  },
  useNullAsDefault: true,
  client: process.env.DB_CLIENT || 'sqlite3'
}


if(database.client  === 'sqlite3') {
  database.connection = {
    user: process.env.DB_FILENAME
  }
} else {
  database.connection = {
    user: process.env.DB_USER || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || ''
  }
}

module.exports = knex(database)
