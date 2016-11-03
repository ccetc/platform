import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Chrome } from '../../../components/chrome/components/chrome'

describe('chrome component', function() {

  it('renders', function() {
    const config = {
      user: {}
    }

    const transition = shallow(
      <Chrome {...config}>children</Chrome>
    )
    expect(transition.is('ReactCSSTransitionGroup')).to.be.ok
    expect(transition.children().length).to.equal(1)

    const chrome = transition.childAt(0).shallow()
    expect(chrome.is('div.chrome')).to.be.ok
    expect(chrome.children().length).to.equal(3)

    const flash = chrome.childAt(0)
    expect(flash.is('Connect(Flash)')).to.be.ok

    const drawer = chrome.childAt(1)
    expect(drawer.is('Connect(Drawer)')).to.be.ok

    const canvas = chrome.childAt(2)
    expect(canvas.is('div.chrome-canvas')).to.be.ok

    const topbar = canvas.childAt(0)
    expect(topbar.is('Connect(Topbar)')).to.be.ok

    expect(canvas.childAt(1).text()).to.equal('children')

    const notifications = canvas.childAt(2)
    expect(notifications.is('Connect(Notifications)')).to.be.ok
  })

})
