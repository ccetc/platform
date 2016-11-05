import { expect } from 'chai'
import serializers from '../../serializers'
import models from '../../models'

describe('user serializer', function() {

  it('can serialize', function(done) {

    const expected = {
      id: 1,
      first_name: 'Ken',
      last_name: 'Schlather',
      email: 'ks47@cornell.edu'
    }

    models.user.forge({ id: 1 }).fetch({ require: true }).then(user => {
      expect(serializers.user(user)).to.eql(expected)
      done()
    })

  })

})
