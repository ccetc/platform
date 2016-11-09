import { expect } from 'chai'
import models from '../../models'

describe('user model', function() {

  it('requires first_name, last_name, and email', function(done) {
    models.user.forge({})
    .save()
    .then(user => {})
    .catch(err => {
      expect(err.errors).to.have.property('first_name')
      expect(err.errors).to.have.property('last_name')
      expect(err.errors).to.have.property('email')
      done()
    })
  })

  it('enforces unique email', function(done) {
    models.user.forge({ email: 'gmk8@cornell.edu' })
    .save()
    .then(user => {})
    .catch(err => {
      expect(err.errors).to.have.property('email')
      done()
    })
  })

  // it('fetch by id', function(done) {
  //   let expected = {
  //     id: 1,
  //     instance_id: 1,
  //     first_name: 'Ken',
  //     last_name: 'Schlather',
  //     email: 'ks47@cornell.edu',
  //     password_hash: null,
  //     password_salt: null,
  //     created_at: null,
  //     updated_at: null
  //   }
  //   user.forge({ id: 1 }).fetch().then(user => {
  //     expect(user.attributes).to.eql(expected)
  //     done()
  //   })
  // })

})
