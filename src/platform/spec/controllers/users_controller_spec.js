import { expect } from 'chai'
import controller from '../../controllers/users_controller'

const testAction = function(action, request, expected, code, done) {
  action(request, { json: actual => {
    expect(actual).to.eql(expected)
    return {
      status: status => {
        expect(status).to.equal(code)
        done()
      }
    }
  }})
}

describe('users controller', function() {

  it('can show all records', function(done) {

    const request = {}

    const expected = [
      { id: 1,first_name: 'Ken', last_name: 'Schlather', email: 'ks47@cornell.edu' },
      { id: 2, first_name: 'Sharon', last_name: 'Anderson', email: 'ska2@cornell.edu' },
      { id: 3, first_name: 'Sandy', last_name: 'Repp', email: 'sjr37@cornell.edu' },
      { id: 4, first_name: 'Greg', last_name: 'Kops', email: 'gmk8@cornell.edu' }
    ]

    testAction(controller.index, request, expected, 200, done)

  })

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

    testAction(controller.show, request, expected, 200, done)

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

    testAction(controller.show, request, expected, 404, done)

  })

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

    testAction(controller.create, request, expected, 201, done)

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

    testAction(controller.create, request, expected, 422, done)

  })

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

    testAction(controller.update, request, expected, 201, done)

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

    testAction(controller.update, request, expected, 422, done)

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

    testAction(controller.update, request, expected, 404, done)

  })

  it('can delete a record', function(done) {

    const request = {
      params: {
        id: 1
      }
    }

    const expected = {}

    testAction(controller.destroy, request, expected, 201, done)

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

    testAction(controller.destroy, request, expected, 404, done)

  })

})
