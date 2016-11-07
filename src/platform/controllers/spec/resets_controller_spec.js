import jwt from 'jwt-simple'
import config from '../../../../config/platform'
import controllers from '../index'
import testAction from '../../../utils/test_action'

describe('resets controller', function() {

  const secret = config[process.env.NODE_ENV].secret

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
