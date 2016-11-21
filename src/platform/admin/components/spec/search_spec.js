import React from 'react'
import { expect } from 'chai'
import { spy } from 'sinon'
import { shallow } from 'enzyme'
import reducer from '../search/reducer'
import * as actionTypes from '../search/action_types'
import { Search } from '../search'

describe('search component', function() {

  describe('reducer', function() {

    it('begins the search', function() {
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
      expect(reducer(state, action)).to.eql(expected)
    })

    it('aborts the search but preserves results', function() {
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
      expect(reducer(state, action)).to.eql(expected)
    })

    it('completes the search abd resets values', function() {
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
      expect(reducer(state, action)).to.eql(expected)
    })

  })

  describe('search', function() {

    it('renders', function() {
      expect(true).to.be.ok
      // const onToggleDrawer = spy()
      const config = {
      }
      const search = shallow(
        <Search {...config} />
      )
      expect(search.is('div.chrome-search')).to.be.ok
      expect(search.children().length).to.equal(2)
      expect(search.childAt(0).is('i.search.icon')).to.be.ok

      const input = search.childAt(1)
      expect(input.is('div.ui.input')).to.be.ok
      expect(input.childAt(0).is('input[type="text"][placeholder="Search"]')).to.be.ok
    })

  })

})
