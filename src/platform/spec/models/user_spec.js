import { request, expect } from 'chai'
import user from '../../models/user'

describe('user model', () => {

  it('requires first_name, last_name, and email', () => {
    user.forge({})
    .save()
    .then(user => {})
    .catch(function (err) {
      expect(err.errors).to.have.property('first_name')
      expect(err.errors).to.have.property('last_name')
      expect(err.errors).to.have.property('email')
    })
  })

  it('enforces unique email', () => {
    user.forge({ email: 'greg@thinktopography.com' })
    .save()
    .then(user => { })
    .catch(function (err) {
      expect(err.errors).to.have.property('email')
    })
  })

})
