import React from 'react'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import { Main } from '../components/main'

describe('main component', function() {

  it('renders', function() {
    const config = {
      title: 'This is a test',
      breadcrumbs: [
        { label: 'Dashboard', route: '/admin' },
        { label: 'Contacts', route: '/admin/contacts' },
        { label: 'Greg Kops' }
      ]
    }
    const main = shallow(
      <Main {...config} />
    )
    expect(main.is('div.chrome-main')).to.be.ok
  })

})
