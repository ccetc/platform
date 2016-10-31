import reducer from '../../../components/chrome/reducer'
import * as actionTypes from '../../../components/chrome/action_types'

describe('collection reducer', () => {

  it('opens the drawer', () => {
    let state = {
      drawer: {
        expanded: false,
        app: 1,
        item: 1
      }
    }
    let action = {
      type: actionTypes.TOGGLE_DRAWER
    }
    let expected = {
      drawer: {
        expanded: true,
        app: null,
        item: null
      }
    }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('closes the drawer', () => {
    let state = {
      drawer: {
        expanded: true,
        app: 1,
        item: 1
      }
    }
    let action = {
      type: actionTypes.TOGGLE_DRAWER
    }
    let expected = {
      drawer: {
        expanded: false,
        app: null,
        item: null
      }
    }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('chooses the app', () => {
    let state = {
      drawer: {
        app: null
      }
    }
    let action = {
      type: actionTypes.CHOOSE_APP,
      index: 1
    }
    let expected = {
      drawer: {
        app: 1
      }
    }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('chooses the item', () => {
    let state = {
      drawer: {
        item: null,
        expanded: true
      }
    }
    let action = {
      type: actionTypes.CHOOSE_ITEM,
      index: 1
    }
    let expected = {
      drawer: {
        item: 1,
        expanded: false
      }
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
