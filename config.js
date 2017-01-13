module.exports = {
  test: {
    secret: 'foo',
    app: {
      port: 8080
    },
    worker: {
      port: 8081
    },
    exceptions: {
      handler: 'throw'
    },
    aws: {
      accessKeyId: 'AKIAIVIRIY7SSCGTAKEA',
      secretAccessKey: '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',
      region: 'us-east-1',
      bucket: 'cdn.cce.cornell.edu'
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      db: 3
    },
    database: {
      pool: {
        min: 1,
        max: 1
      },
      migrations: {
        tableName: 'schema_migrations',
        directory: '/'
      },
      seeds: {
        directory: '/'
      },
      useNullAsDefault: true,
      client: 'sqlite3',
      connection: {
        filename: './data/db.sqlite3'
      }
    }
  },
  development: {
    secret: 'foo',
    registry: {
      servers: [
        'http://registry.thinktopography.com'
      ]
    },
    app: {
      port: 8080
    },
    worker: {
      port: 8081
    },
    exceptions: {
      handler: 'email',
      from: 'Exception Notifier <notifier@cms.cce.cornell.edu>',
      recipients: ['greg@thinktopography.com'],
      prefix: '[PLATFORM]'
    },
    aws: {
      accessKeyId: 'AKIAIVIRIY7SSCGTAKEA',
      secretAccessKey: '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',
      region: 'us-east-1',
      bucket: 'cdn.cce.cornell.edu'
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      db: 3
    },
    database: {
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
      },
      client: 'postgresql',
      connection: {
        database: 'platform',
        user:     'postgres',
        password: ''
      }
    }
  },
  production: {
    secret: 'foo',
    deployment: {
      servers: [
        { host: '107.20.250.100', user: 'root' }
      ],
      key: '/Users/mochini/.ssh/cce.pem'
    },
    app: {
      port: 80
    },
    worker: {
      port: 81
    },
    exceptions: {
      handler: 'email',
      from: 'Exception Notifier <notifier@cms.cce.cornell.edu>',
      recipients: ['greg@thinktopography.com'],
      prefix: '[PLATFORM]'
    },
    aws: {
      accessKeyId: 'AKIAIVIRIY7SSCGTAKEA',
      secretAccessKey: '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',
      region: 'us-east-1',
      bucket: 'cdn.cce.cornell.edu'
    },
    redis: {
      host: '127.0.0.1',
      port: 6379,
      db: 3
    },
    database: {
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
      },
      client: 'postgresql',
      connection: {
        database: 'platform',
        user:     'postgres',
        password: ''
      }
    }
  }
}
