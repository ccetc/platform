import { setup, teardown } from 'platform/tasks/db'
import knex from 'server/services/knex'

before(function(done) {
  setup.then(() => {
    done()
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
  teardown.then(() => {
    done()
  })
})
