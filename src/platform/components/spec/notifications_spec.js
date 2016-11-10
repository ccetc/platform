import React from 'react'
import { expect } from 'chai'
import { spy } from 'sinon'
import { shallow } from 'enzyme'
import reducer from '../notifications/reducer'
import * as actionTypes from '../notifications/action_types'
import { Notifications } from '../notifications'

describe('chrome component', function() {

  describe('reducer', function() {

    it('pushes a notification to the stack')

    it('removes a notification from the stack')

  })

  describe('notifications', function() {

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

})
