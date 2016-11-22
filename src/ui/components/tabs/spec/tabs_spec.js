import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { spy } from 'sinon'
import { Tabs } from '../index'

describe('tabs component', () => {

  it('renders with tabs and pane', () => {
    const Two = (props) => {
      return <div>Two</div>
    }
    const onChangeTab = spy()
    const config = {
      tabs: [
        { label: 'One', content: 'One' },
        { label: 'Two', content: Two },
        { label: 'Two', content: <p>Three</p>  }
      ],
      active: 1,
      onChangeTab
    }
    const tabs = shallow(
      <Tabs {...config} />
    )
    expect(tabs.is('div.tabs')).to.be.truthy
    expect(tabs.children().length).to.equal(2)

    const menu = tabs.childAt(0)
    expect(menu.is('div.ui.top.attached.tabular.menu')).to.be.truthy
    expect(menu.children().length).to.equal(config.tabs.length)

    const pane = tabs.childAt(1)
    expect(pane.is('div.ui.bottom.attached.active.tab.segment')).to.be.truthy
  })


})
