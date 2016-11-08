import { expect } from 'chai'
import jwt from 'jwt-simple'
import authentication from '../middleware/authentication'
import config from '../../services/config'

const testAuthenticatedRequest = function(path, token, expected, code, done) {

  const request = {
    path,
    header: header => `Bearer ${token}`
  }

  testRequest(request, expected, code, done)

}

const testRequest = function(request, expected, code, done) {

  authentication(request, { json: actual => {

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

  const secret = config.secret

  it('rejects authenticated request with malformed token', function(done) {

    const request = {
      path: '/admin/users',
      header: header => 'Beare 1234567890'
    }

    const expected = {
      message: 'malformed token'
    }

    testRequest(request, expected, 401, done)

  })

  it('rejects authenticated request with invalid token', function(done) {

    const expected = {
      message: 'invalid token'
    }

    testAuthenticatedRequest('/admin/users', 'malformed', expected, 401, done)

  })

  it('rejects authenticated request with expired token', function(done) {

    const three_weeks_ago = Math.round(new Date() / 1000) - 60 * 60 * 24 * 7 * 3

    const token = jwt.encode({ timestamp: three_weeks_ago, user_id: 1 }, secret)

    const expected = {
      message: 'expired token'
    }

    testAuthenticatedRequest('/admin/users', token, expected, 401, done)

  })

  it('rejects authenticated request with a token with an invalid user', function(done) {

    const token = jwt.encode({ timestamp: Math.round(new Date() / 1000), user_id: 100 }, secret)

    const expected = {
      message: 'cannot find user'
    }

    testAuthenticatedRequest('/admin/users', token, expected, 401, done)

  })

  it('rejects authenticated request where user has been logged out of all devices', function(done) {

    const yesterday = Math.round(new Date() / 1000) - 60 * 60 *24

    const token = jwt.encode({ timestamp: yesterday, user_id: 3 }, secret)

    const expected = {
      message: 'expired token'
    }

    testAuthenticatedRequest('/admin/users', token, expected, 401, done)

  })

  it('accepts authenticated request to refresh', function(done) {

    const token = jwt.encode({ timestamp: Math.round(new Date() / 1000), user_id: 1 }, secret)

    const expected = {
      token: jwt.encode({ timestamp: Math.round(new Date() / 1000), user_id: 1 }, secret)
    }

    testAuthenticatedRequest('/refresh', token, expected, 200, done)

  })

  it('accepts authenticated request to valid endpoint', function(done) {

    const token = jwt.encode({ timestamp: Math.round(new Date() / 1000), user_id: 1 }, secret)

    const expected = {
      token: jwt.encode({ timestamp: Math.round(new Date() / 1000), user_id: 1 }, secret)
    }

    testAuthenticatedRequest('/admin/users', token, expected, 200, done)

  })

})