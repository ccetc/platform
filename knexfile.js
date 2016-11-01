module.exports = {
  development: {
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'schema_migrations',
      directory: './src/apps/crm/db'
    },
    seeds: {
      directory: './src/apps/expenses/db/fixtures'
    },
    useNullAsDefault: true,
    client: 'sqlite3',
    connection: {
      filename: './db.sqlite3'
    }
  }
}
