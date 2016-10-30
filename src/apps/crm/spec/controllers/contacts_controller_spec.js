import controller from '../controllers/contacts'

jest.unmock('../controllers/contacts')

describe('contacts controller', () => {

  it('renders index', () => {

    const expected = {
      message: 'contacts index'
    }

    controller.index({}, { json: (actual) => {
      expect(actual).toEqual(expected)
    }})

  })

  it('renders show', () => {

    const expected = {
      message: 'contacts show'
    }

    controller.show({}, { json: (actual) => {
      expect(actual).toEqual(expected)
    }})

  })

  it('renders create', () => {

    const expected = {
      message: 'contacts create'
    }

    controller.create({}, { json: (actual) => {
      expect(actual).toEqual(expected)
    }})

  })

  it('renders update', () => {

    const expected = {
      message: 'contacts update'
    }

    controller.update({}, { json: (actual) => {
      expect(actual).toEqual(expected)
    }})

  })

})
