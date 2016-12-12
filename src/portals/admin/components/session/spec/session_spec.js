import { expect } from 'chai'
import reducer from '../reducer'
import * as actionTypes from '../action_types'

describe('session', () => {

  describe('reducer', () => {

    it('it sets the defaults', () => {
      let state = undefined
      let action = {
        type: ''
      }
      let expected = {
        apps: null,
        token: null,
        status: 'pending',
        user: null
      }
      expect(reducer(state, action)).to.be.eql(expected)
    })

  })

})
