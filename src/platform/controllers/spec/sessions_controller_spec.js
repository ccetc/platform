import jwt from 'jwt-simple'
import config from '../../../../config/platform'
import controllers from '../index'
import testAction from '../../../utils/test_action'

describe('sessions controller', function() {

  const secret = config[process.env.NODE_ENV].secret

  it('rejects authentication request without email and password', function(done) {

    const request = {
      body: {}
    }

    const expected = {
      message: 'email and password required'
    }

    testAction(controllers.sessions.create, request, expected, 422, done)

  })

  it('rejects authentication request with invalid email', function(done) {

    const request = {
      body: {
        email: 'mochini@gmail.com',
        password: 'foo'
      }
    }

    const expected = {
      message: 'cannot find user'
    }

    testAction(controllers.sessions.create, request, expected, 422, done)

  })

  it('rejects authentication request with invalid password', function(done) {

    const request = {
      body: {
        email: 'ks47@cornell.edu',
        password: 'foo'
      }
    }

    const expected = {
      message: 'invalid password'
    }

    testAction(controllers.sessions.create, request, expected, 422, done)

  })

  it('accepts authentication request with valid email and valid password', function(done) {

    const request = {
      body: {
        email: 'ks47@cornell.edu',
        password: 'cce'
      }
    }

    const expected = {
      token: jwt.encode({ timestamp: Math.round(new Date() / 1000), user_id: 1 }, secret)
    }

    testAction(controllers.sessions.create, request, expected, 200, done)

  })

})
