describe('reset middleware', function() {

  describe('create route', function() {

    it('accepts request and returns with a token and security_questions')

  })

  describe('claim route', function() {

    it('accepts request and returns with a token and security_questions')

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
