import Platform from '../utils/platform'

var platform = new Platform()
var command = process.argv[2]

if(command == 'migrate:latest') {
  platform.migrateLatest().then(() => process.exit(1))
} else if(command == 'migrate:rollback') {
  platform.migrateRollback().then(() => process.exit(1))
} else if(command == 'seeds:load') {
  platform.seedsLoad().then(() => process.exit(1))
} else if(command == 'fixtures:load') {
  platform.fixturesLoad().then(() => process.exit(1))
}