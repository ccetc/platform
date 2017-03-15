import Promise from 'bluebird'
import route from 'platform/middleware/route'
import glob from 'glob'
import path from 'path'

const processor = (req) => {

  return new Promise((resolve, reject) => {

    const files = glob.sync(path.resolve(__dirname, '../../../**/admin/searches/*_search.js'))

    const searches = files.reduce((searches, filepath) => {

      const matches = filepath.match(/([a-z]*)_search\.js/)

      if(matches) {
        const search = require(filepath).default
        return {
          ...searches,
          [matches[1]]: search(req.query)
        }
      }

      return searches

    }, {})

    const promises = Object.keys(searches).map(key => searches[key])

    Promise.all(promises).then(results => {

      const data = results.reduce((data, result, index) => {
        const key = Object.keys(searches)[index]
        if(result.length > 0) {
          data[key] = result
        }
        return data
      }, {})

      resolve(data)

    }).catch(err => {

      reject({ code: 500, message: err.message })

    })

  })

}

export default route({
  method: 'get',
  path: '/search',
  processor
})
