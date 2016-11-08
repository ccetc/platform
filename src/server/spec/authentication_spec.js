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

  it('accepts authenticated request to refresh', function(done) {

    const token = jwt.encode({ user_id: 1,  timestamp: Math.round(new Date() / 1000) }, secret)

    const expected = {
      token: jwt.encode({ user_id: 1, timestamp: Math.round(new Date() / 1000) }, secret)
    }

    testAuthenticatedRequest('/refresh', token, expected, 200, done)

  })

  it('accepts authenticated request to valid endpoint', function(done) {

    const token = jwt.encode({ user_id: 1, timestamp: Math.round(new Date() / 1000) }, secret)

    const expected = {
      token: jwt.encode({ user_id: 1 , timestamp: Math.round(new Date() / 1000) }, secret)
    }

    testAuthenticatedRequest('/admin/users', token, expected, 200, done)

  })

})
