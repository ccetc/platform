import Promise from 'bluebird'
import route from 'platform/middleware/route'

export const activate = route({
  authenticated: false,
  method: 'get',
  path: '/activate',
  processor: (req) => {
    return new Promise((resolve, reject) => {
      resolve({})
    })
  }
})

export default [
  activate
]
