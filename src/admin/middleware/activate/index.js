import { route } from 'platform/middleware/rest'

export const activate = route({
  authenticated: false,
  method: 'get',
  path: '/activate',
  processor: (req, resolve, reject) => {
    resolve({})
  }
})

export default [
  activate
]
