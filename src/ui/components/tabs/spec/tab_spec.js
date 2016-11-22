import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import Tab from '../tab'

describe('tab component', () => {

  it('renders an inactive tab', () => {
    const tab = shallow(
      <Tab label="Details" index={1} active={false} />
    )
    expect(tab.is('div.item')).to.be.truthy
    expect(tab.text()).to.equal('Details')
  })

  it('renders an active tab', () => {
    const tab = shallow(
      <Tab label="Details" index={1} active={true} />
    )
    expect(tab.is('div.item.active')).to.be.truthy
    expect(tab.text()).to.be.equal('Details')
  })

})
