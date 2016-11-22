import { expect } from 'chai'
import reducer from '../reducer'
import * as actionTypes from '../action_types'

describe('tabs reducer', () => {

  it('it sets the defaults', () => {
    let state = undefined
    let action = {
      type: ''
    }
    let expected = {
      tabs: {
        active: 0
      }
    }
    expect(reducer(state, action)).to.be.eql(expected)
  })

  it('it changes the tab', () => {
    let state = {
      tabs: {
        active: 0
      }
    }
    let action = {
      type: actionTypes.CHANGE_TAB,
      index: 1
    }
    let expected = {
      tabs: {
        active: 1
      }
    }
    expect(reducer(state, action)).to.be.eql(expected)
  })

})
