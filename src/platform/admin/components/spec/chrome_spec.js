import React from 'react'
import { expect } from 'chai'
import { spy } from 'sinon'
import { shallow } from 'enzyme'
import reducer from '../chrome/reducer'
import * as actionTypes from '../chrome/action_types'
import { Chrome } from '../chrome'
import { Drawer } from '../chrome/components/drawer'
import { Flash } from '../chrome/components/flash'
import { Main } from '../chrome/components/main'
import { Topbar } from '../chrome/components/topbar'

describe('chrome component', function() {

  describe('reducer', function() {

    it('opens the drawer', function() {
      let state = {
        drawer: {
          expanded: false
        }
      }
      let action = {
        type: actionTypes.TOGGLE_DRAWER
      }
      let expected = {
        drawer: {
          expanded: true,
          app: null,
          item: null
        }
      }
      expect(reducer(state, action)).to.eql(expected)
    })

    it('closes the drawer', function() {
      let state = {
        drawer: {
          expanded: true
        }
      }
      let action = {
        type: actionTypes.TOGGLE_DRAWER
      }
      let expected = {
        drawer: {
          expanded: false,
          app: null,
          item: null
        }
      }
      expect(reducer(state, action)).to.eql(expected)
    })

    it('chooses the app', function() {
      let state = {
        drawer: {
          app: null
        }
      }
      let action = {
        type: actionTypes.CHOOSE_APP,
        index: 1
      }
      let expected = {
        drawer: {
          app: 1
        }
      }
      expect(reducer(state, action)).to.eql(expected)
    })

    it('chooses the item', function() {
      let state = {
        drawer: {
          item: null,
          expanded: true
        }
      }
      let action = {
        type: actionTypes.CHOOSE_ITEM,
        index: 1
      }
      let expected = {
        drawer: {
          item: 1,
          expanded: false
        }
      }
      expect(reducer(state, action)).to.eql(expected)
    })

  })

  describe('chrome', function() {

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

  describe('drawer', function() {

    it('renders expanded drawer', function() {
      const onChooseApp = spy()
      const onChooseItem = spy()
      const onSignout = spy()
      const config = {
        app: 0,
        apps: [
          { name: 'Contacts', icon: 'user', items: [
            { name: 'Contacts', route: '/crm/contacts' }
          ] },
          { name: 'Settings', icon: 'setting', items: [
            { name: 'Apps', route: '/expenses/apps' },
            { name: 'Users', route: '/expenses/users' }
          ] }      ],
        expanded: true,
        user: {
          name: 'Greg Kops',
          email: 'gmk8@cornell.edu',
          photo: '/images/greg.jpg'
        },
        onChooseApp,
        onChooseItem,
        onSignout
      }
      const transition = shallow(
        <Drawer {...config} />
      )
      expect(transition.is('ReactCSSTransitionGroup')).to.be.ok
      expect(transition.children().length).to.equal(2)

      const overlay = transition.childAt(0).shallow()
      expect(overlay.is('div.chrome-drawer-overlay')).to.be.ok

      const drawer = transition.childAt(1).shallow()
      expect(drawer.is('div.chrome-drawer')).to.be.ok
      expect(drawer.children().length).to.equal(2)

      const presence = drawer.childAt(0).shallow()
      expect(presence.is('div.chrome-presence')).to.be.ok
      expect(presence.children().length).to.equal(2)
      expect(presence.childAt(0).is('img.ui.image.circular')).to.be.ok

      const user = presence.childAt(1)
      expect(user.is('div.chrome-user')).to.be.ok
      expect(user.children().length).to.equal(2)
      expect(user.childAt(0).is('h2')).to.be.ok
      expect(user.childAt(0).text()).to.equal('Greg Kops')
      expect(user.childAt(1).is('p')).to.be.ok
      expect(user.childAt(1).text()).to.equal('gmk8@cornell.edu')

      const apps = drawer.childAt(1).shallow()
      expect(apps.is('div.chrome-apps')).to.be.ok
      expect(apps.children().length).to.equal(3)

      const app1 = apps.childAt(0).shallow()
      expect(app1.is('div.chrome-app')).to.be.ok
      const app1_title = app1.childAt(0)
      expect(app1_title.is('div.chrome-app-title')).to.be.ok
      expect(app1_title.childAt(0).is('i.user.icon')).to.be.ok
      expect(app1_title.text()).to.equal('Contacts')
      expect(app1.childAt(1).is('ReactCSSTransitionGroup')).to.be.ok
      const app1_menu = app1.childAt(1).childAt(0)
      expect(app1_menu.is('div.chrome-app-menu')).to.be.ok
      expect(app1_menu.children().length).to.equal(1)
      const app1_menu_item = app1_menu.childAt(0)
      expect(app1_menu_item.is('div.chrome-app-item')).to.be.ok
      app1_title.simulate('click')
      expect(onChooseApp.callCount).to.equal(1)
      app1_menu_item.simulate('click')
      expect(onChooseItem.callCount).to.equal(1)

      const app2 = apps.childAt(1).shallow()
      expect(app2.is('div.chrome-app')).to.be.ok
      expect(app2.childAt(0).is('div.chrome-app-title')).to.be.ok
      expect(app2.childAt(0).childAt(0).is('i.setting.icon')).to.be.ok
      expect(app2.childAt(0).text()).to.equal('Settings')
      app2.childAt(0).simulate('click')
      expect(onChooseApp.callCount).to.equal(2)

      const signout = apps.childAt(2).shallow()
      expect(signout.is('div.chrome-app')).to.be.ok
      expect(signout.childAt(0).is('div.chrome-app-title')).to.be.ok
      expect(signout.childAt(0).childAt(0).is('i.power.icon')).to.be.ok
      expect(signout.childAt(0).text()).to.equal('Sign Out')
      signout.childAt(0).simulate('click')
      expect(onSignout.callCount).to.equal(1)
    })

  })

  describe('flash', function() {

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

  describe('main', function() {

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

  describe('topbar', function() {

    it('renders topbar', function() {
      const onToggleDrawer = spy()
      const config = {
        unread: 12,
        onToggleDrawer
      }
      const context = { router: { push: (route) => {} } }
      const topbar = shallow(
        <Topbar {...config} />,
        { context }
      )
      expect(topbar.is('div.chrome-topbar')).to.be.ok
      expect(topbar.children().length).to.equal(3)

      const toggle = topbar.childAt(0)
      expect(toggle.is('div.chrome-toggle')).to.be.ok
      expect(toggle.children().length).to.equal(1)
      expect(toggle.childAt(0).is('i.sidebar.icon')).to.be.ok
      toggle.simulate('click')
      expect(onToggleDrawer.calledOnce).to.be.ok

      const search = topbar.childAt(1)
      expect(search.is('Connect(Search)')).to.be.ok

      const alerts = topbar.childAt(2)
      expect(alerts.is('Link.chrome-alerts[to="/admin/notifications"]')).to.be.ok
      expect(alerts.children().length).to.equal(2)
      expect(alerts.childAt(0).is('i.warning.sign.icon')).to.be.ok
      expect(alerts.childAt(1).is('div.chrome-alerts-label')).to.be.ok
      expect(alerts.childAt(1).text()).to.equal('12')
    })

  })

})
