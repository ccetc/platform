import Platform from '../../utils/platform'
import knex from '../../services/knex'

const platform = new Platform()

before(function(done) {
  platform.migrateRollback().then(() => {
    platform.migrateLatest().then(() => {
      platform.fixturesLoad().then(() => {
        done()
      })
    })
  })
})

beforeEach(function(done) {
  knex.raw("BEGIN TRANSACTION").then(() => {
     done()
   })
})

afterEach(function (done) {
  knex.raw("ROLLBACK").then(() => {
    done()
  })
})

after(function(done) {
  platform.migrateRollback().then(() => {
    done()
  })
})
