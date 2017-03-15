import Promise from 'bluebird'
import route from 'platform/middleware/route'

export const reset = route({
  authenticated: false,
  method: 'get',
  path: '/reset',
  processor: (req) => {
    return new Promise((resolve, reject) => {
      resolve({})
    })
  }
})

export default [
  reset
]
