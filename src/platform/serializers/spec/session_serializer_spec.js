import { expect } from 'chai'
import serializers from '../index'
import models from '../../models'

describe('session serializer', function() {

  it('can serialize', function(done) {

    const expected = {
      apps: [
        { name: 'Contacts', icon: 'user', items: [
          { name: 'Contacts', route: '/admin/crm/contacts' }
        ] },
        { name: 'Expenses', icon: 'dollar', items: [
          { name: 'Advances', route: '/admin/expenses/advances' },
          { name: 'Expense Types', route: '/admin/expenses/expense_types' },
          { name: 'Expenses', route: '/admin/expenses/expenses' },
          { name: 'Projects', route: '/admin/expenses/projects' },
          { name: 'Trips', route: '/admin/expenses/trips' },
          { name: 'Vendors', route: '/admin/expenses/vendors' }
        ] },
        { name: 'Instance', icon: 'setting', items: [
          { name: 'Activities', route: '/admin/instance/activities' },
          { name: 'Apps', route: '/admin/instance/apps' },
          { name: 'Emails', route: '/admin/instance/emails' },
          { name: 'Settings', route: '/admin/instance/settings' },
          { name: 'Users', route: '/admin/instance/users' }
        ] }
      ],
      user: {
        name: 'Ken Schlather',
        email: 'ks47@cornell.edu',
        photo: 'https://s3.amazonaws.com/assets/1/ken.jpg',
        permissions: [
          'can access contacts',
          'can access expenses',
          'can access instance'
        ]
      }
    }

    models.user.forge({ id: 1 }).fetch({ require: true, withRelated: ['photo'] }).then(user => {
      expect(serializers.session(user)).to.eql(expected)
      done()
    })

  })

})
