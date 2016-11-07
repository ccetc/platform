import React from 'react'
import { expect } from 'chai'
// import { spy } from 'sinon'
import { shallow } from 'enzyme'
import { Search } from '../components/search'

describe('search component', function() {

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