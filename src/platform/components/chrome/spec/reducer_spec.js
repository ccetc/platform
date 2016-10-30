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

  it('changes the app', () => {
    let state = {
      active: null,
      expanded: true
    }
    let action = {
      type: actionTypes.CHANGE_APP,
      index: 1
    }
    let expected = {
      active: 1,
      expanded: false
    }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('begins the search', () => {
    let state = {
      search: {}
    }
    let action = {
      type: actionTypes.BEGIN_SEARCH,
      index: 1
    }
    let expected = {
      search: {
        active: true
      }
    }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('aborts the search but preserves results', () => {
    let state = {
      search: {
        results: [
          { name: 'Greg Kops' }
        ],
        active: true
      }
    }
    let action = {
      type: actionTypes.ABORT_SEARCH
    }
    let expected = {
      search: {
        results: [
          { name: 'Greg Kops' }
        ],
        active: false
      }
    }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('completes the search abd resets values', () => {
    let state = {
      search: {
        results: [
          { name: 'Greg Kops' }
        ],
        active: true
      }
    }
    let action = {
      type: actionTypes.COMPLETE_SEARCH,
      index: 0
    }
    let expected = {
      search: {
        query: '',
        active: false,
        results: [],
        choice: { name: 'Greg Kops' }
      }
    }
    expect(reducer(state, action)).toEqual(expected)
  })

})
