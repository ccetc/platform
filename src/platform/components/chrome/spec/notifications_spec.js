import React from 'react'
import { expect } from 'chai'
import { spy } from 'sinon'
import { shallow } from 'enzyme'
import { Notifications } from '../components/notifications'

describe('notifications component', function() {

  it('renders', function() {
    const onPushNotification = spy()
    const onReadNotification = spy()
    const config = {
      queue: [
        { id: 1, story: { text: 'this is a notification' } }
      ],
      onPushNotification,
      onReadNotification
    }
    const notifications = shallow(
      <Notifications {...config} />
    )
    expect(notifications.is('div.chrome-notifications')).to.be.ok

  })

})