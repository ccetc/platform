import Platform from 'server/utils/platform'
import knex from 'server/services/knex'

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
  knex.raw('BEGIN TRANSACTION').then(() => {
    done()
  })
})

afterEach(function (done) {
  knex.raw('ROLLBACK').then(() => {
    done()
  })
})

after(function(done) {
  platform.migrateRollback().then(() => {
    done()
  })
})
