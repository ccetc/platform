module.exports = {
  test: {
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
