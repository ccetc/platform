import { expect } from 'chai'
import serializers from '../../serializers'

describe('user serializer', function() {

  it('can serialize', function(done) {

    const user = {
      id: 1,
      first_name: 'Ken',
      last_name: 'Schlather',
      email: 'ks47@cornell.edu',
      password_hash: null,
      password_salt: null,
      created_at: null,
      updated_at: null
    }

    const expected = {
      id: 1,
      first_name: 'Ken',
      last_name: 'Schlather',
      email: 'ks47@cornell.edu'
    }

    expect(serializers.user(user)).to.eql(expected)
    done()
  })

})
