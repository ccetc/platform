import { expect } from 'chai'
import jwtSimple from 'jwt-simple'
import config from '../../services/config'
import jwt from '../jwt'

describe('jwt', function() {

  describe('encode', function() {

    it('can encode json', function() {

      const actual = jwt.encode({ user_id: 1 })

      const timestamp = Math.round(new Date() / 1000)
      const payload = { user_id: 1, timestamp }
      const expected = jwtSimple.encode(payload, config.secret)

      expect(actual).to.equal(expected)

    })

  })

  describe('decode', function() {

    it('can decode valid jwt', function() {

      const timestamp = Math.round(new Date() / 1000)
      const payload = { user_id: 1, timestamp }
      const token = jwtSimple.encode(payload, config.secret)

      const actual = jwt.decode(token)

      const expected = { user_id: 1, timestamp }

      expect(actual).to.eql(expected)

    })

    it('can handle invalid jwt', function() {

      const actual = jwt.decode('dsafsadfsadf')
      const expected = null

      expect(actual).to.equal(expected)

    })

  })

  describe('extract_token_from_header', function() {

    const testExtractTokenFromHeader = function(request, expected, code, done) {
      jwt.extract_token_from_header(request, { status: status => {
        expect(status).to.equal(code)
        return {
          json: actual => {
            expect(actual).to.eql(expected)
            done()
          }
        }
      }}, () => {
        expect(true).to.equal(true)
        done()
      })
    }

    it('rejects requests with nonexistant token in header', function(done) {

      const request = {
        header: header => null
      }

      const expected = {
        message: 'nonexistant token'
      }

      testExtractTokenFromHeader(request, expected, 401, done)

    })

    it('rejects requests with malformed token in header', function(done) {

      const request = {
        header: header => 'Beare 1234567890'
      }

      const expected = {
        message: 'malformed token'
      }

      testExtractTokenFromHeader(request, expected, 401, done)

    })

    it('returns valid token in header', function() {

      const request = {
        header: header => 'Bearer 1234567890'
      }

      const actual = jwt.extract_token_from_header(request, {}, 'Authentication')

      const expected = '1234567890'

      expect(actual).to.equal(expected)

    })

  })

  describe('with_token', function() {

    const one_week = 60 * 60 * 24 * 7

    const testToken = function(timestamp, data) {
      const payload = { ...data, timestamp }
      return jwtSimple.encode(payload, config.secret)
    }

    const testWithToken = function(token, expected, code, done) {
      jwt.with_token({}, { status: status => {
        expect(status).to.equal(code)
        return {
          json: actual => {
            expect(actual).to.eql(expected)
            done()
          }
        }
      }}, token, one_week, 'user_id', 'logged_out_at', (req, res, user) => {
        expect(true).to.equal(true)
        done()
      })
    }


    it('rejects requests with invalid token', function(done) {

      const token = 'adsfsadfs'

      const expected = {
        message: 'invalid token'
      }

      testWithToken(token, expected, 401, done)

    })

    it('rejects expired token', function(done) {

      const timestamp = Math.round(new Date() / 1000) - (one_week * 2)
      const token = testToken(timestamp, { user_id: 1 })

      const expected = {
        message: 'expired token'
      }

      testWithToken(token, expected, 401, done)

    })

    it('rejects tokens for invalid users', function(done) {

      const timestamp = Math.round(new Date() / 1000)
      const token = testToken(timestamp, { user_id: 100 })

      const expected = {
        message: 'cannot find user'
      }

      testWithToken(token, expected, 401, done)

    })

    it('rejects invalidated tokens for valid users', function(done) {

      const timestamp = Math.round(new Date() / 1000) - 60 * 60 * 24
      const token = testToken(timestamp, { user_id: 3 })

      const expected = {
        message: 'expired token'
      }

      testWithToken(token, expected, 401, done)

    })

    it('accepts validated tokens for valid users', function(done) {

      const timestamp = Math.round(new Date() / 1000) - 60 * 60 * 24
      const token = testToken(timestamp, { user_id: 1 })

      const expected = {}

      testWithToken(token, expected, 200, done)

    })

  })

})
