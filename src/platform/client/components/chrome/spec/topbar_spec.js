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
    expect(topbar.children().length).toEqual(2)

    const toggle = topbar.childAt(0)
    expect(toggle.is('div.chrome-toggle')).toBeTruthy()
    expect(toggle.children().length).toEqual(1)
    expect(toggle.childAt(0).is('i.sidebar.icon')).toBeTruthy()
    toggle.simulate('click')
    expect(onToggleDrawer.calledOnce).toBeTruthy()

    const search = topbar.childAt(1)
    expect(search.is('Connect(Search)')).toBeTruthy()
  })

})
