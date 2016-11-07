import React from 'react'
import { expect } from 'chai'
import { spy } from 'sinon'
import { shallow } from 'enzyme'
import { Flash } from '../components/flash'

describe('flash component', function() {

  it('renders', function() {
    const onClearFlash = spy()
    const config = {
      flash: {
        style: 'error',
        message: 'You made a mistake'
      },
      onClearFlash
    }
    const transition = shallow(
      <Flash {...config} />
    )
    expect(transition.is('ReactCSSTransitionGroup')).to.be.ok
    expect(transition.children().length).to.equal(1)

    const flash = transition.childAt(0).shallow()
    expect(flash.is('div.chrome-flash')).to.be.ok
  })

})
