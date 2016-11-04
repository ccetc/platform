import React from 'react'
import { expect } from 'chai'
import { spy } from 'sinon'
import { shallow } from 'enzyme'
import { Drawer } from '../../../components/chrome/components/drawer'

describe('drawer component', function() {

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
