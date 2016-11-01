import { expect } from 'chai'
import Platform from '../../../utils/platform'
import controller from '../../controllers/users_controller'

describe('users controller', function() {

  beforeEach(function(done) {
    const platform = new Platform()
    platform.setupTest(done)
  })

  it('renders index', function(done) {

    const expected = [
      { id: 1, first_name: 'Greg', last_name: 'Kops', email: 'gmk8@cornell.edu' },
      { id: 2, first_name: 'Ken', last_name: 'Schlather', email: 'ks47@cornell.edu' }
    ]

    controller.index({}, { json: actual => {
      expect(actual).to.eql(expected)
      done()
    }})

  })

  it('renders show', function(done) {

    const expected = {
      id: 1,
      first_name: 'Greg',
      last_name: 'Kops',
      email: 'gmk8@cornell.edu'
    }

    controller.show({ params: { id: 1 }}, { json: actual => {
      expect(actual).to.eql(expected)
      done()
    }})

  })

  // it('renders create', function() {
  //
  //   const expected = {
  //     message: 'users create'
  //   }
  //
  //   controller.create({}, { json: actual => {
  //     expect(actual).to.equal(expected)
  //   }})
  //
  // })
  //
  // it('renders update', function() {
  //
  //   const expected = {
  //     message: 'users update'
  //   }
  //
  //   controller.update({}, { json: actual => {
  //     expect(actual).to.equal(expected)
  //   }})
  //
  // })

})
