module.exports = {
  test: {
    secret: 'foo',
    redis: {
      host: '127.0.0.1',
      port: 6379,
      db: 3
    },
    database: {
      client: 'postgresql',
      connection: {
        database: 'circle_test',
        user:     'ubuntu',
        password: ''
      }
    }
  },
  development: {
    secret: 'foo',
    redis: {
      host: '127.0.0.1',
      port: 6379,
      db: 3
    },
    database: {
      client: 'postgresql',
      connection: {
        database: 'circle_test',
        user:     'ubuntu',
        password: ''
      }
    }
  }
}
