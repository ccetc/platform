import controllers from '../../controllers'
import testAction from '../../../utils/test_action'

describe('users controller', function() {

  describe('index action', function() {

    it('can show all records', function(done) {

      const request = {
        query: {}
      }

      const expected = [
        { id: 1,first_name: 'Ken', last_name: 'Schlather', email: 'ks47@cornell.edu' },
        { id: 2, first_name: 'Sharon', last_name: 'Anderson', email: 'ska2@cornell.edu' },
        { id: 3, first_name: 'Sandy', last_name: 'Repp', email: 'sjr37@cornell.edu' },
        { id: 4, first_name: 'Greg', last_name: 'Kops', email: 'gmk8@cornell.edu' }
      ]

      testAction(controllers.users.index, request, expected, 200, done)

    })

  })

  describe('show action', function() {

    it('can show a record', function(done) {

      const request = {
        params: {
          id: 1
        }
      }

      const expected = {
        id: 1,
        first_name: 'Ken',
        last_name: 'Schlather',
        email: 'ks47@cornell.edu'
      }

      testAction(controllers.users.show, request, expected, 200, done)

    })

    it('cannot show a nonexistant record', function(done) {

      const request = {
        params: {
          id: 100
        }
      }

      const expected = {
        message: 'Unable to fetch record'
      }

      testAction(controllers.users.show, request, expected, 404, done)

    })

  })

  describe('create action', function() {

    it('can create a record with valid data', function(done) {

      const request = {
        body: {
          first_name: 'Megan',
          last_name: 'Pugh',
          email: 'mmp246@cornell.edu'
        }
      }

      const expected = {
        id: 5,
        first_name: 'Megan',
        last_name: 'Pugh',
        email: 'mmp246@cornell.edu'
      }

      testAction(controllers.users.create, request, expected, 201, done)

    })

    it('cannot create a record with invalid data', function(done) {

      const request = {
        body: {
          first_name: '',
          last_name: '',
          email: ''
        }
      }

      const expected = {
        message: 'There were problems with your data',
        errors: {
          first_name: ['The first_name is required'],
          last_name: ['The last_name is required'],
          email: ['The email is required']
        }
      }

      testAction(controllers.users.create, request, expected, 422, done)

    })

  })

  describe('update action', function() {

    it('can update a record with valid data', function(done) {

      const request = {
        params: {
          id: 1
        },
        body: {
          first_name: 'Kenneth'
        }
      }

      const expected = {
        id: 1,
        first_name: 'Kenneth',
        last_name: 'Schlather',
        email: 'ks47@cornell.edu'
      }

      testAction(controllers.users.update, request, expected, 201, done)

    })

    it('cannot update a record with invalid data', function(done) {

      const request = {
        params: {
          id: 1
        },
        body: {
          first_name: '',
          last_name: '',
          email: ''
        }
      }

      const expected = {
        message: 'There were problems with your data',
        errors: {
          first_name: ['The first_name is required'],
          last_name: ['The last_name is required'],
          email: ['The email is required']
        }
      }

      testAction(controllers.users.update, request, expected, 422, done)

    })

    it('cannot update a nonexistant record', function(done) {

      const request = {
        params: {
          id: 100
        },
        body: {}
      }

      const expected = {
        message: 'Unable to fetch record'
      }

      testAction(controllers.users.update, request, expected, 422, done)

    })

  })

  describe('update action', function() {

    it('can delete a record', function(done) {

      const request = {
        params: {
          id: 1
        }
      }

      const expected = {}

      testAction(controllers.users.destroy, request, expected, 201, done)

    })

    it('cannot delete a nonexistant record', function(done) {

      const request = {
        params: {
          id: 100
        }
      }

      const expected = {
        message: 'Unable to fetch record'
      }

      testAction(controllers.users.destroy, request, expected, 422, done)

    })

  })

})
