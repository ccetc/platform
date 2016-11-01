import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Chrome } from '../../../components/chrome/components/chrome'

describe('chrome component', function() {

  it('renders', function() {
    const config = {
      expanded: true
    }
    const chrome = shallow(
      <Chrome {...config}>children</Chrome>
    )
    expect(chrome.is('div.chrome')).to.be.ok
    expect(chrome.children().length).to.equal(2)

    const drawer = chrome.childAt(0)
    expect(drawer.is('Connect(Drawer)')).to.be.ok

    const canvas = chrome.childAt(1)
    expect(canvas.is('div.chrome-canvas')).to.be.ok

    const topbar = canvas.childAt(0)
    expect(topbar.is('Connect(Topbar)')).to.be.ok

    expect(canvas.childAt(1).text()).to.equal('children')

    const notifications = canvas.childAt(2)
    expect(notifications.is('Connect(Notifications)')).to.be.ok
  })

})
