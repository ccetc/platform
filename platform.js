var fs = require('fs')
var path = require('path')
var config = require('./knexfile')['development']
var Knex = require('knex/lib')
var Migrator = require('knex/lib/migrate')

var getMigrations = function(direction) {
  var migrations = []
  fs.readdirSync('./src/platform/db/migrations').filter(function(migration) {
    migrations.push(path.resolve('./src/platform/db/migrations', migration))
  })
  fs.readdirSync('./src/apps').filter(function(app) {
    if(fs.statSync(path.join('./src/apps', app)).isDirectory()) {
      fs.readdirSync('./src/apps/'+app+'/db/migrations').filter(function(migration) {
        migrations.push(path.resolve('./src/apps', app, 'db/migrations', migration))
      })
    }
  })
  return migrations
}

var knex = new Knex(config)
var migrations = getMigrations()
var migrator = new Migrator(knex)
var command = process.argv[2]

if(command == 'migrate:latest') {
  migrator.config = migrator.setConfig(config)
  migrator._migrationData()
    .spread((all, completed) => {
      return migrator._runBatch(migrations, 'up')
    })
} else if(command == 'migrate:rollback') {
  migrator._runBatch(migrations.reverse(), 'down')
}
