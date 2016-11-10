import { expect } from 'chai'
import permit from '../permit'

describe('permit', function() {

  it('omits non whitelisted keys', function() {

    const body = {
      a: 1,
      b: 2
    }

    const expected = {
      a: 1
    }

    const actual = permit(body, ['a'])

    expect(actual).to.eql(expected)

  })

  it('omits null keys', function() {

    const body = {
      a: 1,
      b: null
    }

    const expected = {
      a: 1
    }

    const actual = permit(body, ['a','b'])

    expect(actual).to.eql(expected)

  })

  it('whitelists valid keys', function() {

    const body = {
      a: 1,
      b: 2
    }

    const expected = {
      a: 1,
      b: 2
    }

    const actual = permit(body, ['a','b'])

    expect(actual).to.eql(expected)

  })

})
