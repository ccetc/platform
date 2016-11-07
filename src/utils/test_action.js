import { expect } from 'chai'

export default function(action, request, expected, code, done) {
  action(request, { json: actual => {
    expect(actual).to.eql(expected)
    return {
      status: status => {
        expect(status).to.equal(code)
        done()
      }
    }
  }})
}
