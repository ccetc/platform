import controllers from '../../controllers'
import testAction from '../../../utils/test_action'

describe('resets controller', function() {

  it('rejects request without email', function(done) {

    const request = {
      body: {}
    }

    const expected = {
      message: 'email required'
    }

    testAction(controllers.resets.create, request, expected, 422, done)

  })

  it('rejects request with invalid email', function(done) {

    const request = {
      body: {
        email: 'mochini@gmail.com'
      }
    }

    const expected = {
      message: 'cannot find user'
    }

    testAction(controllers.resets.create, request, expected, 422, done)

  })


  it('accepts request with valid email', function(done) {

    const request = {
      body: {
        email: 'ks47@cornell.edu'
      }
    }

    const expected = {}

    testAction(controllers.resets.create, request, expected, 200, done)

  })

})
