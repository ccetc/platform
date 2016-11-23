import { middleware, claim, security, password } from '../index'
import jwt from 'server/services/jwt'
import { expect } from 'chai'

describe('activation middleware', function() {

  describe('middleware', function() {

    it('rejects malformed tokens', function(done) {

      middleware({ headers: { authorization: 'Bearer 123' } }, {}, error => {
        expect(error.code()).to.be.equal(401)
        expect(error.message()).to.be.equal('jwt malformed')
        done()
      })

    })

    it('cannot load user from token', function(done) {

      const two_weeks = 60 * 60 * 24 * 7 * 2
      const token = jwt.encode({ activation_user_id: 10 }, two_weeks)

      middleware({ headers: { authorization: `Bearer ${token}` } }, {}, error => {
        expect(error.code()).to.be.equal(401)
        expect(error.message()).to.be.equal('cannot find user')
        done()
      })

    })

    it('can load user from token', function(done) {

      const two_weeks = 60 * 60 * 24 * 7 * 2
      const token = jwt.encode({ activation_user_id: 1 }, two_weeks)

      middleware({ headers: { authorization: `Bearer ${token}` } }, {}, () => {
        expect(true).to.be.truthy
        done()
      })

    })

  })

  describe('claim route', function() {

    it('accepts authenticated request and returns success', function(done) {

      const two_weeks = 60 * 60 * 24 * 7 * 2
      const token = jwt.encode({ activation_user_id: 1 }, two_weeks)

      claim({ headers: { authorization: `Bearer ${token}` } }, {
        status: code => {
          expect(code).to.be.equal(201)
          return {
            json: data => {
              expect(data).to.be.eql({ success: true })
              done()
            }
          }
        }
      })

    })

  })

  describe('security route', function() {

    it('rejects requests without an answer to a security_question')

    it('rejects requests with an invalid answer to a security_question_1')

    it('rejects requests with an invalid answer to a security_question_2')

    it('accepts request with a valid answer')

  })

  describe('password route', function() {

    it('rejects requests without a new and confirmed password')

    it('rejects requests with a new and confirmed password that do not match')

    it('rejects requests with an invalid answer to a security_question_2')

    it('accepts request with matching new and confirmed passwords')

  })

})
