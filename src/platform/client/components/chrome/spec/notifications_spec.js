import React from 'react'
import { spy } from 'sinon'
import { shallow } from 'enzyme'
import { Notifications } from '../components/notifications'

jest.unmock('../components/notifications')

describe('notifications component', () => {

  it('renders', () => {
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
    expect(notifications.is('div.chrome-notifications')).toBeTruthy()

  })

})
