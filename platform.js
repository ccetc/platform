var _ = require('lodash')
var fs = require('fs')
var path = require('path')
var config = require('./config/platform.js')[process.env.NODE_ENV].database
var Knex = require('knex/lib')
var Migrator = require('knex/lib/migrate')
var Seeder = require('knex/lib/seed')

const getMigrations = (completed, direction) => {
  var timestamps = []
  var migrations = {}
  fs.readdirSync('./src/platform/db/migrations').filter((migration) => {
    var fullpath = path.resolve('./src/platform/db/migrations', migration)
    var is_completed = _.includes(completed, fullpath)
    if((direction == 'up' && !is_completed) || (direction == 'down' && is_completed)) {
      var timestamp = migration.split('_')[0]
      timestamps.push(timestamp)
      migrations[timestamp] = fullpath
    }
  })
  fs.readdirSync('./src/apps').filter((app) => {
    if(fs.statSync(path.join('./src/apps', app)).isDirectory()) {
      fs.readdirSync(path.join('./src/apps', app, 'db/migrations')).filter((migration) => {
        var fullpath = path.resolve('./src/apps', app, 'db/migrations', migration)
        var is_completed = _.includes(completed, fullpath)
        if((direction == 'up' && !is_completed) || (direction == 'down' && is_completed)) {
          var timestamp = migration.split('_')[0]
          timestamps.push(timestamp)
          migrations[timestamp] = fullpath
        }
      })
    }
  })
  return timestamps.sort().map((timestamp) => {
    return migrations[timestamp]
  })
}

const getSeeds = (filename) => {
  var seeds = []
  seeds.push(path.resolve('./src/platform/db', filename+'.js'))
  fs.readdirSync('./src/apps').filter((app) => {
    if(fs.statSync(path.join('./src/apps', app)).isDirectory()) {
      seeds.push(path.resolve('./src/apps', app, 'db', filename+'.js'))
    }
  })
  return seeds
}

var knex = new Knex(config)
var command = process.argv[2]
var klass = command.split(':')[0]
var action = command.split(':')[1]

if(klass == 'migrate') {
  var migrator = new Migrator(knex)
  migrator.config = migrator.setConfig(config)
  if(action == 'latest') {
    migrator._migrationData().spread((all, completed) => {
      var migrations = getMigrations(completed, 'up')
      migrator._runBatch(migrations, 'up').then(() => process.exit(1))
    })
  } else if(action == 'rollback') {
    migrator._migrationData().spread((all, completed) => {
      var migrations = getMigrations(completed, 'down')
      migrator._runBatch(migrations.reverse(), 'down').then(() => process.exit(1))
    })
  }
} else if(klass == 'seeds' || klass == 'fixtures') {
  var seeder = new Seeder(knex)
  if(command == 'seeds:load') {
    var seeds = getSeeds('seeds')
    seeder._seedData().spread((all) => {
      seeder._runSeeds(seeds).then(() => process.exit(1))
    })
  } else if(command == 'fixtures:load') {
    var fixtures = getSeeds('fixtures')
    seeder._seedData().spread((all) => {
      seeder._runSeeds(fixtures).then(() => process.exit(1))
    })
  }
}
