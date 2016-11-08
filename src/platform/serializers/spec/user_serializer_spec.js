import { expect } from 'chai'
import serializers from '../index'
import mockModel from '../../../utils/mock_model'

describe('user serializer', function() {

  it('can serialize', function() {

    const user = mockModel({
      id: 1,
      first_name: 'Ken',
      last_name: 'Schlather',
      email: 'ks47@cornell.edu'
    })

    const expected = {
      id: 1,
      first_name: 'Ken',
      last_name: 'Schlather',
      email: 'ks47@cornell.edu'
    }

    expect(serializers.user(user)).to.eql(expected)

  })

})
