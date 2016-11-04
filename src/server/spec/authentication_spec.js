import { expect } from 'chai'
import jwt from 'jwt-simple'
import authentication from '../middleware/authentication'
import config from '../../../config/platform'

const testRequest = function(path, request, expected, code, done) {
  authentication(request, { json: actual => {
    expect(actual).to.eql(expected)
    return {
      status: status => {
        expect(status).to.equal(code)
        done()
      }
    }
  }})
}

describe('authentication middleware', function() {

  const secret = config[process.env.NODE_ENV].secret

  it('rejects authentication request without email and password', function(done) {

    const request = {
      path: '/authenticate',
      query: {}
    }

    const expected = {
      message: 'email and password required'
    }

    testRequest('/authenticate', request, expected, 422, done)

  })

  it('rejects authentication request with invalid email', function(done) {

    const request = {
      path: '/authenticate',
      query: {
        email: 'mochini@gmail.com',
        password: 'foo'
      }
    }

    const expected = {
      message: 'cannot find user'
    }

    testRequest('/authenticate', request, expected, 422, done)

  })

  it('rejects authentication request with invalid password', function(done) {

    const request = {
      path: '/authenticate',
      query: {
        email: 'gmk8@cornell.edu',
        password: 'foo'
      }
    }

    const expected = {
      message: 'invalid password'
    }

    testRequest('/authenticate', request, expected, 422, done)

  })

  it('accepts authentication request with valid email and valid password', function(done) {

    const request = {
      path: '/authenticate',
      query: {
        email: 'gmk8@cornell.edu',
        password: 'test'
      }
    }

    const expected = {
      token: jwt.encode({ timestamp: Math.round(new Date() / 1000), user: 1 }, secret)
    }

    testRequest('/authenticate', request, expected, 200, done)

  })

})
