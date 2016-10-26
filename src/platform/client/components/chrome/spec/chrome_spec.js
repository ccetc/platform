import React from 'react'
import { shallow } from 'enzyme'
import { Chrome } from '../components/chrome'

jest.unmock('../components/chrome')

describe('chrome component', () => {

  it('renders expanded', () => {
    const config = {
      expanded: true
    }
    const chrome = shallow(
      <Chrome {...config}>children</Chrome>
    )
    expect(chrome.is('div.chrome.expanded')).toBeTruthy()
    expect(chrome.children().length).toEqual(2)

    const drawer = chrome.childAt(0)
    expect(drawer.is('Connect(Drawer)')).toBeTruthy()

    const canvas = chrome.childAt(1)
    expect(canvas.is('div.chrome-canvas')).toBeTruthy()

    const topbar = canvas.childAt(0)
    expect(topbar.is('Connect(Topbar)')).toBeTruthy()

    const header = canvas.childAt(1)
    expect(header.is('div.chrome-header')).toBeTruthy()

    expect(canvas.childAt(2).text()).toEqual('children')
  })

  it('renders collapsed', () => {
    const config = {
      expanded: false
    }
    const chrome = shallow(
      <Chrome {...config} />
    )
    expect(chrome.is('div.chrome')).toBeTruthy()
  })

})
