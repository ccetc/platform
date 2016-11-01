import { request, expect } from 'chai'
import controller from '../../controllers/users_controller'

describe('users controller', () => {

  it('renders index', () => {

    const expected = [{
      id: 1,
      first_name: 'Greg',
      last_name: 'Kops',
      email: 'greg@thinktopography.com'
    }]

    controller.index({}, { json: (actual) => {
      expect(actual).to.eql(expected)
    }})

  })

  it('renders show', () => {

    const expected = {
      id: 1,
      first_name: 'Greg',
      last_name: 'Kops',
      email: 'greg@thinktopography.com'
    }

    controller.show({ params: { id: 1 }}, { json: (actual) => {
      expect(actual).to.eql(expected)
    }})

  })

  // it('renders create', () => {
  //
  //   const expected = {
  //     message: 'users create'
  //   }
  //
  //   controller.create({}, { json: (actual) => {
  //     expect(actual).to.equal(expected)
  //   }})
  //
  // })
  //
  // it('renders update', () => {
  //
  //   const expected = {
  //     message: 'users update'
  //   }
  //
  //   controller.update({}, { json: (actual) => {
  //     expect(actual).to.equal(expected)
  //   }})
  //
  // })

})
