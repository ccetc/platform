import controllers from '../../controllers'
import testAction from '../../../utils/test_action'

describe('resets controller', function() {

  describe('create action', function() {

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

  describe('claim action', function() {

    it('accepts request and returns with a token and security_questions')

  })

  describe('security action', function() {

    it('rejects requests without an answer to a security_question')

    it('rejects requests with an invalid answer to a security_question_1')

    it('rejects requests with an invalid answer to a security_question_2')

    it('accepts request with a valid answer')

  })

  describe('password action', function() {

    it('rejects requests without a new and confirmed password')

    it('rejects requests with a new and confirmed password that do not match')

    it('rejects requests with an invalid answer to a security_question_2')

    it('accepts request with matching new and confirmed passwords')

  })

})
