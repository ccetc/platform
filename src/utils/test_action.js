import { expect } from 'chai'

export default function(action, request, expected, code, done) {
  action(request, { status: status => {
    expect(status).to.equal(code)
    return {
      json: actual => {
        expect(actual).to.eql(expected)
        done()
      }
    }
  }})
}
