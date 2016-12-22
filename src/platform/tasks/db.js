const _        = require('lodash')
const fs       = require('fs')
const path     = require('path')
const knex     = require('server/services/knex')
const Migrator = require('knex/lib/migrate')
const Seeder = require('knex/lib/seed')
const migrator = new Migrator(knex)
const seeder   = new Seeder(knex)

module.exports = {
  migrateLatest(args, environment) {
    return migrator._migrationData().spread((all, completed) => {
      let migrations = _getMigrations(completed, 'up')
      return migrator._runBatch(migrations, 'up')
    })
  },

  migrateRollback(args, environment) {
    return migrator._migrationData().spread((all, completed) => {
      let migrations = _getMigrations(completed, 'down')
      return migrator._runBatch(migrations.reverse(), 'down')
    })
  },

  seedsLoad(args, environment) {
    return seeder._seedData().spread((all) => {
      let seeds = _getSeeds('seeds')
      return seeder._runSeeds(seeds)
    })
  },

  fixturesLoad(args, environment) {
    return seeder._seedData().spread((all) => {
      let fixtures = _getSeeds('fixtures')
      return seeder._runSeeds(fixtures)
    })
  },

  setupTest() {
    return this.migrateRollback().then(() => {
      return this.migrateLatest().then(() => {
        return this.fixturesLoad()
      })
    })
  }
}

function _getMigrations (completed, direction) {
  let timestamps = [];
  let migrations = {};
  fs.readdirSync(path.join(__dirname, '../../platform/db/migrations')).filter((migration) => {
    var fullpath = path.resolve(__dirname, '../../platform/db/migrations', migration)
    var is_completed = _.includes(completed, fullpath)
    if((direction == 'up' && !is_completed) || (direction == 'down' && is_completed)) {
      var timestamp = migration.split('_')[0]
      timestamps.push(timestamp)
      migrations[timestamp] = fullpath
    }
  })
  fs.readdirSync(path.join(__dirname, '../../apps')).filter((app) => {
    if(fs.existsSync(path.join(__dirname, '../../apps', app, 'db/migrations'))) {
      fs.readdirSync(path.join(__dirname, '../../apps', app, 'db/migrations')).filter((migration) => {
        var fullpath = path.resolve(__dirname, '../../apps', app, 'db/migrations', migration)
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

function _getSeeds (filename) {
  let seeds = [];
  seeds.push(path.resolve(__dirname, '../../platform/db', filename + '.js'))
  fs.readdirSync(path.join(__dirname, '../../apps')).filter((app) => {
    if(fs.existsSync(path.join(__dirname, '../../apps', app, 'db', filename + '.js'))) {
      seeds.push(path.resolve(__dirname, '../../apps', app, 'db', filename + '.js'))
    }
  })
  return seeds
}
