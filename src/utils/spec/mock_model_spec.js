import { expect } from 'chai'
import mockModel from '../mock_model'

describe('mock model', function() {

  it('returns valid property', function() {

    const user = mockModel({
      first_name: 'Ken'
    })

    expect(user.get('first_name')).to.equal('Ken')

  })

  it('returns null for non existant property', function() {

    const user = mockModel({})

    expect(user.get('last_name')).to.equal(null)

  })

  it('returns null for non existant relation', function() {

    const user = mockModel({})

    expect(user.related('photo')).to.equal(null)

  })

  it('returns valid related property', function() {

    const user = mockModel({
      photo: {
        url: '/images/ken.jpg'
      }
    })

    expect(user.related('photo').get('url')).to.equal('/images/ken.jpg')

  })

  it('returns null for non existant related property', function() {

    const user = mockModel({
      photo: {}
    })

    expect(user.related('photo').get('id')).to.equal(null)

  })

})
