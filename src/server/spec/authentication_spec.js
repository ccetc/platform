import { expect } from 'chai'
import jwt from 'jwt-simple'
import authentication from '../middleware/authentication'
import config from '../../../config/platform'

const testRequest = function(path, query, expected, code, done) {
  authentication({ path, query }, { json: actual => {
    expect(actual).to.eql(expected)
    return {
      status: status => {
        expect(status).to.equal(code)
        done()
      }
    }
  }})
}

const testAuthenticatedRequest = function(path, token, expected, code, done) {
  authentication({
    path,
    header: header => {
      return `Bearer ${token}`
    }
  }, { json: actual => {
    expect(actual).to.eql(expected)
    return {
      status: status => {
        expect(status).to.equal(code)
        done()
      }
    }
  }}, () => {
    expect(true).to.equal(true)
    done()
  })
}

describe('authentication middleware', function() {

  const secret = config[process.env.NODE_ENV].secret

  it('rejects authentication request without email and password', function(done) {

    const query = {
    }

    const expected = {
      message: 'email and password required'
    }

    testRequest('/authenticate', query, expected, 422, done)

  })

  it('rejects authentication request with invalid email', function(done) {

    const query = {
      email: 'mochini@gmail.com',
      password: 'foo'
    }

    const expected = {
      message: 'cannot find user'
    }

    testRequest('/authenticate', query, expected, 422, done)

  })

  it('rejects authentication request with invalid password', function(done) {

    const query = {
      email: 'gmk8@cornell.edu',
      password: 'foo'
    }

    const expected = {
      message: 'invalid password'
    }

    testRequest('/authenticate', query, expected, 422, done)

  })

  it('accepts authentication request with valid email and valid password', function(done) {

    const query = {
      email: 'gmk8@cornell.edu',
      password: 'test'
    }

    const expected = {
      token: jwt.encode({ timestamp: Math.round(new Date() / 1000), user: 1 }, secret)
    }

    testRequest('/authenticate', query, expected, 200, done)

  })

  it('rejects authenticated request with malformed token')

  it('rejects authenticated request with invalid token', function(done) {

    const expected = {
      message: 'invalid token'
    }

    testAuthenticatedRequest('/admin/users', 'malformed', expected, 401, done)

  })

  it('rejects authenticated request with expired token', function(done) {

    const three_weeks_ago = Math.round(new Date() / 1000) - 60 * 60 * 24 * 7 * 3

    const token = jwt.encode({ timestamp: three_weeks_ago, user: 1 }, secret)

    const expected = {
      message: 'expired token'
    }

    testAuthenticatedRequest('/admin/users', token, expected, 401, done)

  })

  it('rejects authenticated request with an invalid user', function(done) {

    const token = jwt.encode({ timestamp: Math.round(new Date() / 1000), user: 100 }, secret)

    const expected = {
      message: 'invalid user'
    }

    testAuthenticatedRequest('/admin/users', token, expected, 401, done)

  })

  it('rejects authenticated request where user has been logged out of all devices',)

  it('accepts authenticated request to refresh', function(done) {

    const token = jwt.encode({ timestamp: Math.round(new Date() / 1000), user: 1 }, secret)

    const expected = {
      token: jwt.encode({ timestamp: Math.round(new Date() / 1000), user: 1 }, secret)
    }

    testAuthenticatedRequest('/refresh', token, expected, 200, done)

  })

  it('accepts authenticated request to valid endpoint', function(done) {

    const token = jwt.encode({ timestamp: Math.round(new Date() / 1000), user: 1 }, secret)

    const expected = {
      token: jwt.encode({ timestamp: Math.round(new Date() / 1000), user: 1 }, secret)
    }

    testAuthenticatedRequest('/admin/users', token, expected, 200, done)

  })

})
