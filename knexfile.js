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
    directory: './db/seeds'
  }
}

module.exports = {
  // test: Object.assign({}, defaults, {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: './db.sqlite3'
  //   }
  // }),
  test: Object.assign({}, defaults, {
    client: 'postgresql',
    connection: {
      database: 'platform',
      user:     'postgres',
      password: ''
    }
  }),
  development: Object.assign({}, defaults, {
    client: 'postgresql',
    connection: {
      database: 'platform',
      user:     'postgres',
      password: ''
    }
  })
}
