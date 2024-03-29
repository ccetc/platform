import { expect } from 'chai'
import App from '../app'

describe('app model', function() {

  it('requires title', function(done) {

    App.forge({}).save().catch(err => {

      expect(err.errors).to.have.property('title')
      done()

    })

  })

  it('enforces unique title', function(done) {

    App.forge({ title: 'Expenses' }).save().catch(err => {

      expect(err.errors).to.have.property('title')
      done()

    })

  })

})
