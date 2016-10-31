import React from 'react'
import { spy } from 'sinon'
import { shallow } from 'enzyme'
import { Drawer } from '../../../components/chrome/components/drawer'

describe('drawer component', () => {

  it('renders expanded drawer', () => {
    const onChooseApp = spy()
    const onChooseItem = spy()
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
      onChooseItem
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
    expect(app1.is('div.chrome-app')).toBeTruthy()
    const app1_title = app1.childAt(0)
    expect(app1_title.is('div.chrome-app-title')).toBeTruthy()
    expect(app1_title.childAt(0).is('i.user.icon')).toBeTruthy()
    expect(app1_title.text()).toEqual('Contacts')
    expect(app1.childAt(1).is('ReactCSSTransitionGroup')).toBeTruthy()
    const app1_menu = app1.childAt(1).childAt(0)
    expect(app1_menu.is('div.chrome-app-menu')).toBeTruthy()
    expect(app1_menu.children().length).toEqual(1)
    const app1_menu_item = app1_menu.childAt(0)
    expect(app1_menu_item.is('div.chrome-app-item')).toBeTruthy()
    app1_title.simulate('click')
    expect(onChooseApp.callCount).toEqual(1)
    app1_menu_item.simulate('click')
    expect(onChooseItem.callCount).toEqual(1)

    const app2 = apps.childAt(1).shallow()
    expect(app2.is('div.chrome-app')).toBeTruthy()
    expect(app2.childAt(0).is('div.chrome-app-title')).toBeTruthy()
    expect(app2.childAt(0).childAt(0).is('i.setting.icon')).toBeTruthy()
    expect(app2.childAt(0).text()).toEqual('Settings')
    app2.childAt(0).simulate('click')
    expect(onChooseApp.callCount).toEqual(2)
  })

})
