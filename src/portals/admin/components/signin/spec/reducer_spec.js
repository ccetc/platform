import { expect } from 'chai'
import reducer from '../reducer'
import * as actionTypes from '../action_types'

describe('signin reducer', function() {

  it('it sets the defaults', function() {
    let state = undefined
    let action = {
      type: ''
    }
    let expected = {
      signin: {
        flash: null,
        status: 'ready',
        token: null
      }
    }
    expect(reducer(state, action)).to.be.eql(expected)
  })

  it('it removes flash and updates status upon request', function() {
    let state = {
      signin: {
        flash: 'something',
        status: 'ready',
        token: null
      }
    }
    let action = {
      type: actionTypes.SIGNIN_REQUEST
    }
    let expected = {
      signin: {
        flash: null,
        status: 'submitting',
        token: null
      }
    }
    expect(reducer(state, action)).to.be.eql(expected)
  })

  it('it removes flash and updates status and sets token upon success', function() {
    let state = {
      signin: {
        flash: 'something',
        status: 'submitting',
        token: null
      }
    }
    let action = {
      type: actionTypes.SIGNIN_SUCCESS,
      data: {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0Nzk3OTIzNzksImV4cCI6MTQ4MTAwMTk3OSwiZGF0YSI6eyJ1c2VyX2lkIjo0fX0.R5AuKNbHGPLpDxhcfH0854_a04I4C8SdCbEh_QtRNJQ'
      }
    }
    let expected = {
      signin: {
        flash: null,
        status: 'success',
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE0Nzk3OTIzNzksImV4cCI6MTQ4MTAwMTk3OSwiZGF0YSI6eyJ1c2VyX2lkIjo0fX0.R5AuKNbHGPLpDxhcfH0854_a04I4C8SdCbEh_QtRNJQ'
      }
    }
    expect(reducer(state, action)).to.be.eql(expected)
  })

  it('it sets flash and updates status upon failure', function() {
    let state = {
      signin: {
        flash: null,
        status: 'submitting',
        token: null
      }
    }
    let action = {
      type: actionTypes.SIGNIN_FAILURE,
      error: {
        message: 'unable to find user'
      }
    }
    let expected = {
      signin: {
        flash: {
          style: 'error',
          message: 'unable to find user'
        },
        status: 'failure',
        token: null
      }
    }
    expect(reducer(state, action)).to.be.eql(expected)
  })

})
