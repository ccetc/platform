import React from 'react'
import { spy } from 'sinon'
import { shallow } from 'enzyme'
import { Topbar } from '../components/topbar'

jest.unmock('../components/topbar')

describe('topbar component', () => {

  it('renders topbar', () => {
    const onToggleDrawer = spy()
    const config = {
      unread: 12,
      onToggleDrawer
    }
    const topbar = shallow(
      <Topbar {...config} />
    )
    expect(topbar.is('div.chrome-topbar')).toBeTruthy()
    expect(topbar.children().length).toEqual(3)

    const toggle = topbar.childAt(0)
    expect(toggle.is('div.chrome-toggle')).toBeTruthy()
    expect(toggle.children().length).toEqual(1)
    expect(toggle.childAt(0).is('i.sidebar.icon')).toBeTruthy()
    toggle.simulate('click')
    expect(onToggleDrawer.calledOnce).toBeTruthy()

    const search = topbar.childAt(1)
    expect(search.is('Connect(Search)')).toBeTruthy()

    const alerts = topbar.childAt(2)
    expect(alerts.is('div.chrome-alerts')).toBeTruthy()
    expect(alerts.children().length).toEqual(2)
    expect(alerts.childAt(0).is('i.warning.sign.icon')).toBeTruthy()
    expect(alerts.childAt(1).is('div.chrome-alerts-label')).toBeTruthy()
    expect(alerts.childAt(1).text()).toEqual('12')
  })

})
