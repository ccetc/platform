import reducer from '../reducer'
import * as actionTypes from '../action_types'

jest.unmock('../reducer')
jest.unmock('lodash')

describe('collection reducer', () => {

  it('opens the drawer', () => {
    let state = {
      expanded: false
    }
    let action = {
      type: actionTypes.TOGGLE_DRAWER
    }
    let expected = {
      expanded: true
    }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('closes the drawer', () => {
    let state = {
      expanded: true
    }
    let action = {
      type: actionTypes.TOGGLE_DRAWER
    }
    let expected = {
      expanded: false
    }
    expect(reducer(state, action)).toEqual(expected)
  })

})
