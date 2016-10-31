import React from 'react'
// import { spy } from 'sinon'
import { shallow } from 'enzyme'
import { Search } from '../../../components/chrome/components/search'

describe('search component', () => {

  it('renders', () => {
    expect(true).toBeTruthy()
    // const onToggleDrawer = spy()
    const config = {
    }
    const search = shallow(
      <Search {...config} />
    )
    expect(search.is('div.chrome-search')).toBeTruthy()
    expect(search.children().length).toEqual(2)
    expect(search.childAt(0).is('i.search.icon')).toBeTruthy()

    const input = search.childAt(1)
    expect(input.is('div.ui.input')).toBeTruthy()
    expect(input.childAt(0).is('input[type="text"][placeholder="Search"]')).toBeTruthy()
  })

})
