import controller from '../../controllers/users_controller'

require('es6-promise').polyfill()

describe('users controller', () => {

  it('renders index', () => {

    const expected = {
      message: 'users index'
    }

    controller.index({}, { json: (actual) => {
      expect(actual).toEqual(expected)
    }})

  })

  it('renders show', () => {

    const expected = {
      message: 'users show'
    }

    controller.show({ params: { id: 1 }}, { json: (actual) => {
      expect(actual).toEqual(expected)
    }})

  })

  // it('renders create', () => {
  //
  //   const expected = {
  //     message: 'users create'
  //   }
  //
  //   controller.create({}, { json: (actual) => {
  //     expect(actual).toEqual(expected)
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
  //     expect(actual).toEqual(expected)
  //   }})
  //
  // })

})
