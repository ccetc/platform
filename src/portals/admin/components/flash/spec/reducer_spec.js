import { expect } from 'chai'
import reducer from '../reducer'
import * as actionTypes from '../action_types'

describe('flash reducer', () => {

  it('it sets the defaults', () => {
    let state = undefined
    let action = {
      type: ''
    }
    let expected = {
      flash: {
        style: null,
        message: null
      }
    }
    expect(reducer(state, action)).to.be.eql(expected)
  })

})
