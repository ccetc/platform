import React from 'react'
import { spy } from 'sinon'
import { shallow } from 'enzyme'
import { Topbar } from '../components/topbar'

jest.unmock('../components/topbar')

describe('topbar component', () => {

  it('renders topbar', () => {
    const onToggleDrawer = spy()
    const config = {
      onToggleDrawer
    }
    const topbar = shallow(
      <Topbar {...config} />
    )
    expect(topbar.is('div.chrome-topbar')).toBeTruthy()
    expect(topbar.children().length).toEqual(3)

    const overlay = topbar.childAt(0)
    expect(overlay.is('div.chrome-overlay')).toBeTruthy()

    const toggle = topbar.childAt(1)
    expect(toggle.is('div.chrome-toggle')).toBeTruthy()
    expect(toggle.children().length).toEqual(1)
    expect(toggle.childAt(0).is('i.sidebar.icon')).toBeTruthy()
    toggle.simulate('click')
    expect(onToggleDrawer.calledOnce).toBeTruthy()

    const search = topbar.childAt(2)
    expect(search.is('div.chrome-search')).toBeTruthy()
    expect(search.children().length).toEqual(2)
    expect(search.childAt(0).is('i.search.icon')).toBeTruthy()

    const input = search.childAt(1)
    expect(input.is('div.ui.input')).toBeTruthy()
    expect(input.childAt(0).is('input[type="text"][placeholder="Search"]')).toBeTruthy()
  })

})
