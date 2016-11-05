module.exports = {
  test: {
    secret: 'foo',
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
