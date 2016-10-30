import React from 'react'
import { spy } from 'sinon'
import { shallow } from 'enzyme'
import { Drawer } from '../components/drawer'

jest.unmock('../components/drawer')

describe('drawer component', () => {

  it('renders expanded drawer', () => {
    const onChangeApp = spy()
    const config = {
      active: 0,
      apps: [
        { name: 'Contacts', icon: 'user', route: '/crm/contacts' },
        { name: 'Settings', icon: 'setting', route: '/settings' }
      ],
      expanded: true,
      user: {
        name: 'Greg Kops',
        email: 'gmk8@cornell.edu',
        photo: '/images/greg.jpg'
      },
      onChangeApp
    }
    const transition = shallow(
      <Drawer {...config} />
    )
    expect(transition.is('ReactCSSTransitionGroup')).toBeTruthy()
    expect(transition.children().length).toEqual(2)

    const overlay = transition.childAt(0).shallow()
    expect(overlay.is('div.chrome-drawer-overlay')).toBeTruthy()

    const drawer = transition.childAt(1).shallow()
    expect(drawer.is('div.chrome-drawer')).toBeTruthy()
    expect(drawer.children().length).toEqual(2)

    const presence = drawer.childAt(0).shallow()
    expect(presence.is('div.chrome-presence')).toBeTruthy()
    expect(presence.children().length).toEqual(2)
    expect(presence.childAt(0).is('img.ui.image.circular')).toBeTruthy()

    const user = presence.childAt(1)
    expect(user.is('div.chrome-user')).toBeTruthy()
    expect(user.children().length).toEqual(2)
    expect(user.childAt(0).is('h2')).toBeTruthy()
    expect(user.childAt(0).text()).toEqual('Greg Kops')
    expect(user.childAt(1).is('p')).toBeTruthy()
    expect(user.childAt(1).text()).toEqual('gmk8@cornell.edu')

    const apps = drawer.childAt(1).shallow()
    expect(apps.is('div.chrome-apps')).toBeTruthy()
    expect(apps.children().length).toEqual(2)

    const app1 = apps.childAt(0).shallow()
    expect(app1.is('div.chrome-app.active')).toBeTruthy()
    expect(app1.childAt(0).is('i.user.icon')).toBeTruthy()
    expect(app1.text()).toEqual('Contacts')
    app1.simulate('click')
    expect(onChangeApp.callCount).toEqual(1)

    const app2 = apps.childAt(1).shallow()
    expect(app2.is('div.chrome-app')).toBeTruthy()
    expect(app2.childAt(0).is('i.setting.icon')).toBeTruthy()
    expect(app2.text()).toEqual('Settings')
    app2.simulate('click')
    expect(onChangeApp.callCount).toEqual(2)
  })

})
