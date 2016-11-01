import _ from 'lodash'
import fs from 'fs'
import path from 'path'
import knex from '../services/knex'
import Migrator from 'knex/lib/migrate'
import Seeder from 'knex/lib/seed'

class Platform {

  constructor() {
    this.migrator = new Migrator(knex)
    this.seeder = new Seeder(knex)
  }

  migrateLatest() {
    return this.migrator._migrationData().spread((all, completed) => {
      let migrations = this._getMigrations(completed, 'up')
      return this.migrator._runBatch(migrations, 'up')
    })

  }

  migrateRollback() {
    return this.migrator._migrationData().spread((all, completed) => {
      let migrations = this._getMigrations(completed, 'down')
      return this.migrator._runBatch(migrations.reverse(), 'down')
    })
  }

  seedsLoad() {
    return this.seeder._seedData().spread((all) => {
      let seeds = this._getSeeds('seeds')
      return this.seeder._runSeeds(seeds)
    })
  }

  fixturesLoad() {
    return this.seeder._seedData().spread((all) => {
      let fixtures = this._getSeeds('fixtures')
      return this.seeder._runSeeds(fixtures)
    })
  }

  setupTest(cb) {
    return this.migrateRollback().then(() => {
      return this.migrateLatest().then(() => {
        return this.fixturesLoad()
      })
    })
  }

  _getMigrations = (completed, direction) => {
    var timestamps = []
    var migrations = {}
    fs.readdirSync(path.join('./src/platform/db/migrations')).filter((migration) => {
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

  _getSeeds = (dir) => {
    var seeds = []
    fs.readdirSync(path.join('./src/platform/db', dir)).filter((seed) => {
      seeds.push(path.resolve('./src/platform/db', dir, seed))
    })
    fs.readdirSync(path.join('./src/apps')).filter((app) => {
      if(fs.statSync(path.join('./src/apps', app)).isDirectory()) {
        fs.readdirSync(path.join('./src/apps', app, 'db', dir)).filter((seed) => {
          seeds.push(path.resolve('./src/apps', app, 'db', dir, seed))
        })
      }
    })
    return seeds
  }

}

export default Platform
